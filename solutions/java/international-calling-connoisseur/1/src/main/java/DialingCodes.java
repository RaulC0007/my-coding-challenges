import java.util.Map;
import java.util.HashMap;

public class DialingCodes {
    // Internal map to store dialing codes (key) and countries (value)
    private Map<Integer, String> dialingCodes = new HashMap<>();

    // Task 1: Return the current map of codes
    public Map<Integer, String> getCodes() {
        return dialingCodes;
    }

    // Task 2: Add or update a dialing code entry
    public void setDialingCode(Integer code, String country) {
        dialingCodes.put(code, country);
    }

    // Task 3: Lookup a country by its dialing code
    public String getCountry(Integer code) {
        return dialingCodes.get(code);
    }

    // Task 4: Add a new entry only if neither the code nor the country already exists
    public void addNewDialingCode(Integer code, String country) {
        // Check if the code is already in the map
        if (dialingCodes.containsKey(code)) {
            return;
        }
        // Check if the country is already mapped to some other code
        if (dialingCodes.containsValue(country)) {
            return;
        }
        // If both checks pass, add the new entry
        dialingCodes.put(code, country);
    }

    // Task 5: Find the dialing code for a given country
    public Integer findDialingCode(String country) {
        for (Map.Entry<Integer, String> entry : dialingCodes.entrySet()) {
            if (entry.getValue().equals(country)) {
                return entry.getKey();
            }
        }
        return null;
    }

    // Task 6: Update the dialing code for an existing country
    public void updateCountryDialingCode(Integer code, String country) {
        // First, find the old code associated with this country
        Integer oldCode = findDialingCode(country);
        
        // If the country exists in the map
        if (oldCode != null) {
            // Remove the old entry
            dialingCodes.remove(oldCode);
            // Add the new entry with the updated code
            dialingCodes.put(code, country);
        }
    }
}