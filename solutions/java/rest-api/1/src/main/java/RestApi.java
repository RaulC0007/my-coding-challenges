import org.json.JSONObject;
import org.json.JSONArray;
import java.util.*;

class RestApi {
    private final Map<String, User> database;

    RestApi(User... users) {
        database = new HashMap<>();
        for (User user : users) {
            database.put(user.name(), user);
        }
    }

    String get(String url) {
        if (url.equals("/users")) {
            return getUsersJson(new ArrayList<>(database.values()));
        }
        return "";
    }

    String get(String url, JSONObject payload) {
        if (url.equals("/users")) {
            JSONArray requestedNames = payload.getJSONArray("users");
            List<User> users = new ArrayList<>();
            for (int i = 0; i < requestedNames.length(); i++) {
                String name = requestedNames.getString(i);
                if (database.containsKey(name)) {
                    users.add(database.get(name));
                }
            }
            return getUsersJson(users);
        }
        return "";
    }
    
    private String getUsersJson(List<User> users) {
        users.sort(Comparator.comparing(User::name));
        JSONArray usersArray = new JSONArray();
        for (User user : users) {
            usersArray.put(userToJsonObject(user));
        }
        JSONObject response = new JSONObject();
        response.put("users", usersArray);
        return response.toString();
    }

    String post(String url, JSONObject payload) {
        if (url.equals("/add")) {
            String name = payload.getString("user");
            User newUser = User.builder().setName(name).build();
            database.put(name, newUser);
            return userToJsonObject(newUser).toString();
        }
        
        if (url.equals("/iou")) {
            String lenderName = payload.getString("lender");
            String borrowerName = payload.getString("borrower");
            double amount = payload.getDouble("amount");
            
            User lender = database.get(lenderName);
            User borrower = database.get(borrowerName);
            
            // Extraemos las deudas actuales a mapas para facilitar la actualización
            Map<String, Double> lenderOwes = new HashMap<>();
            for (Iou iou : lender.owes()) lenderOwes.put(iou.name, iou.amount);
            Map<String, Double> lenderOwedBy = new HashMap<>();
            for (Iou iou : lender.owedBy()) lenderOwedBy.put(iou.name, iou.amount);
            
            Map<String, Double> borrowerOwes = new HashMap<>();
            for (Iou iou : borrower.owes()) borrowerOwes.put(iou.name, iou.amount);
            Map<String, Double> borrowerOwedBy = new HashMap<>();
            for (Iou iou : borrower.owedBy()) borrowerOwedBy.put(iou.name, iou.amount);
            
            // Lógica de compensación de deudas (Netting)
            if (lenderOwes.containsKey(borrowerName)) {
                double currentDebt = lenderOwes.get(borrowerName);
                if (currentDebt > amount + 1e-9) {
                    lenderOwes.put(borrowerName, currentDebt - amount);
                    borrowerOwedBy.put(lenderName, currentDebt - amount);
                } else if (Math.abs(currentDebt - amount) <= 1e-9) {
                    lenderOwes.remove(borrowerName);
                    borrowerOwedBy.remove(lenderName);
                } else {
                    lenderOwes.remove(borrowerName);
                    borrowerOwedBy.remove(lenderName);
                    double remaining = amount - currentDebt;
                    lenderOwedBy.put(borrowerName, lenderOwedBy.getOrDefault(borrowerName, 0.0) + remaining);
                    borrowerOwes.put(lenderName, borrowerOwes.getOrDefault(lenderName, 0.0) + remaining);
                }
            } else {
                lenderOwedBy.put(borrowerName, lenderOwedBy.getOrDefault(borrowerName, 0.0) + amount);
                borrowerOwes.put(lenderName, borrowerOwes.getOrDefault(lenderName, 0.0) + amount);
            }
            
            // Reconstruimos los objetos User (ya que son inmutables)
            User.Builder lenderBuilder = User.builder().setName(lenderName);
            for (Map.Entry<String, Double> entry : lenderOwes.entrySet()) lenderBuilder.owes(entry.getKey(), entry.getValue());
            for (Map.Entry<String, Double> entry : lenderOwedBy.entrySet()) lenderBuilder.owedBy(entry.getKey(), entry.getValue());
            User newLender = lenderBuilder.build();
            
            User.Builder borrowerBuilder = User.builder().setName(borrowerName);
            for (Map.Entry<String, Double> entry : borrowerOwes.entrySet()) borrowerBuilder.owes(entry.getKey(), entry.getValue());
            for (Map.Entry<String, Double> entry : borrowerOwedBy.entrySet()) borrowerBuilder.owedBy(entry.getKey(), entry.getValue());
            User newBorrower = borrowerBuilder.build();
            
            database.put(lenderName, newLender);
            database.put(borrowerName, newBorrower);
            
            // La respuesta debe incluir a ambos usuarios ordenados alfabéticamente
            List<User> updatedUsers = Arrays.asList(newLender, newBorrower);
            updatedUsers.sort(Comparator.comparing(User::name));
            
            JSONArray usersArray = new JSONArray();
            for (User user : updatedUsers) {
                usersArray.put(userToJsonObject(user));
            }
            JSONObject response = new JSONObject();
            response.put("users", usersArray);
            return response.toString();
        }
        return "";
    }
    
    // --- Métodos auxiliares para serialización JSON usando org.json ---
    
    private JSONObject userToJsonObject(User user) {
        JSONObject userObj = new JSONObject();
        userObj.put("name", user.name());
        
        JSONObject owesObj = new JSONObject();
        double totalOwes = 0;
        for (Iou iou : user.owes()) {
            owesObj.put(iou.name, iou.amount);
            totalOwes += iou.amount;
        }
        userObj.put("owes", owesObj);
        
        JSONObject owedByObj = new JSONObject();
        double totalOwedBy = 0;
        for (Iou iou : user.owedBy()) {
            owedByObj.put(iou.name, iou.amount);
            totalOwedBy += iou.amount;
        }
        // ¡Importante! La clave debe ser "owedBy" (camelCase), no "owed_by"
        userObj.put("owedBy", owedByObj); 
        
        userObj.put("balance", totalOwedBy - totalOwes);
        
        return userObj;
    }
}