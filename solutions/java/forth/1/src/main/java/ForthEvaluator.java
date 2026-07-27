import java.util.*;

class ForthEvaluator {
    private static final Set<String> BUILTINS = new HashSet<>(Arrays.asList("+", "-", "*", "/", "dup", "drop", "swap", "over"));

    List<Integer> evaluateProgram(List<String> input) {
        List<String> tokens = new ArrayList<>();
        // Tokenize input: split by whitespace and convert to lowercase for case-insensitivity
        for (String s : input) {
            for (String t : s.split("\\s+")) {
                if (!t.isEmpty()) {
                    tokens.add(t.toLowerCase());
                }
            }
        }

        Map<String, List<String>> definitions = new HashMap<>();
        List<Integer> stack = new ArrayList<>();
        int ip = 0; // instruction pointer

        while (ip < tokens.size()) {
            String token = tokens.get(ip++);
            
            // Handle word definitions
            if (token.equals(":")) {
                if (ip >= tokens.size()) throw new IllegalArgumentException("incomplete definition");
                String name = tokens.get(ip++);
                
                // 🔧 FIX: Updated message for redefining numbers
                if (isNumber(name)) {
                    throw new IllegalArgumentException("Cannot redefine numbers");
                }
                
                List<String> def = new ArrayList<>();
                // Read tokens until semicolon
                while (ip < tokens.size() && !tokens.get(ip).equals(";")) {
                    String defToken = tokens.get(ip++);
                    if (isNumber(defToken)) {
                        def.add(defToken);
                    } else if (definitions.containsKey(defToken)) {
                        // Capture current definition (expansion) to handle redefinition correctly
                        def.addAll(definitions.get(defToken));
                    } else if (BUILTINS.contains(defToken)) {
                        def.add(defToken);
                    } else {
                        // 🔧 FIX: Updated message for undefined word inside definition
                        throw new IllegalArgumentException("No definition available for operator \"" + defToken + "\"");
                    }
                }
                if (ip >= tokens.size()) throw new IllegalArgumentException("incomplete definition");
                ip++; // skip semicolon
                definitions.put(name, def);
            } else {
                // Execute token
                execute(token, stack, definitions);
            }
        }
        return stack;
    }

    private void execute(String token, List<Integer> stack, Map<String, List<String>> definitions) {
        if (isNumber(token)) {
            stack.add(Integer.parseInt(token));
        } else if (definitions.containsKey(token)) {
            // Execute user-defined word by executing its expanded definition
            for (String defToken : definitions.get(token)) {
                execute(defToken, stack, definitions);
            }
        } else if (BUILTINS.contains(token)) {
            switch (token) {
                case "+":
                    if (stack.size() < 2) throw new IllegalArgumentException("Addition requires that the stack contain at least 2 values");
                    int b = stack.remove(stack.size() - 1);
                    int a = stack.remove(stack.size() - 1);
                    stack.add(a + b);
                    break;
                case "-":
                    if (stack.size() < 2) throw new IllegalArgumentException("Subtraction requires that the stack contain at least 2 values");
                    b = stack.remove(stack.size() - 1);
                    a = stack.remove(stack.size() - 1);
                    stack.add(a - b);
                    break;
                case "*":
                    if (stack.size() < 2) throw new IllegalArgumentException("Multiplication requires that the stack contain at least 2 values");
                    b = stack.remove(stack.size() - 1);
                    a = stack.remove(stack.size() - 1);
                    stack.add(a * b);
                    break;
                case "/":
                    if (stack.size() < 2) throw new IllegalArgumentException("Division requires that the stack contain at least 2 values");
                    b = stack.remove(stack.size() - 1);
                    a = stack.remove(stack.size() - 1);
                    // 🔧 FIX: Updated message for division by zero
                    if (b == 0) throw new IllegalArgumentException("Division by 0 is not allowed");
                    stack.add(a / b);
                    break;
                case "dup":
                    if (stack.size() < 1) throw new IllegalArgumentException("Duplicating requires that the stack contain at least 1 value");
                    stack.add(stack.get(stack.size() - 1));
                    break;
                case "drop":
                    if (stack.size() < 1) throw new IllegalArgumentException("Dropping requires that the stack contain at least 1 value");
                    stack.remove(stack.size() - 1);
                    break;
                case "swap":
                    if (stack.size() < 2) throw new IllegalArgumentException("Swapping requires that the stack contain at least 2 values");
                    b = stack.remove(stack.size() - 1);
                    a = stack.remove(stack.size() - 1);
                    stack.add(b);
                    stack.add(a);
                    break;
                case "over":
                    if (stack.size() < 2) throw new IllegalArgumentException("Overing requires that the stack contain at least 2 values");
                    b = stack.remove(stack.size() - 1);
                    a = stack.remove(stack.size() - 1);
                    stack.add(a);
                    stack.add(b);
                    stack.add(a);
                    break;
            }
        } else {
            // 🔧 FIX: Updated message for undefined word during execution
            throw new IllegalArgumentException("No definition available for operator \"" + token + "\"");
        }
    }

    private boolean isNumber(String s) {
        return s.matches("-?\\d+");
    }
}