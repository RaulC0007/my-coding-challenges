class Atbash {

    String encode(String input) {
        // Encoding requires grouping output into blocks of 5
        return process(input, true);
    }

    String decode(String input) {
        // Decoding returns a continuous string
        return process(input, false);
    }

    private String process(String input, boolean group) {
        StringBuilder result = new StringBuilder();
        int count = 0;

        for (int i = 0; i < input.length(); i++) {
            char c = Character.toLowerCase(input.charAt(i));

            // Apply Atbash substitution for letters
            if (c >= 'a' && c <= 'z') {
                c = (char) ('z' - c + 'a');
            } 
            // Skip non-alphanumeric characters (punctuation, spaces, etc.)
            else if (c < '0' || c > '9') {
                continue;
            }

            // Add space separator for encoding every 5 characters
            if (group && count > 0 && count % 5 == 0) {
                result.append(' ');
            }
            
            result.append(c);
            count++;
        }
        return result.toString();
    }
}