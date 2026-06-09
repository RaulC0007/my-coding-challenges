class RaindropConverter {

    String convert(int number) {
        StringBuilder result = new StringBuilder();
        
        // Check divisibility by 3, 5, and 7 independently
        if (number % 3 == 0) {
            result.append("Pling");
        }
        if (number % 5 == 0) {
            result.append("Plang");
        }
        if (number % 7 == 0) {
            result.append("Plong");
        }
        
        // If no sounds were added, return the number as a string
        if (result.length() == 0) {
            return String.valueOf(number);
        }
        
        return result.toString();
    }
}