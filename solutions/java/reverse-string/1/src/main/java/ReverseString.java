class ReverseString {

    String reverse(String inputString) {
        // Handle null or empty strings safely
        if (inputString == null || inputString.isEmpty()) {
            return inputString;
        }
        
        // Use StringBuilder for efficient reversal
        return new StringBuilder(inputString).reverse().toString();
    }
  
}