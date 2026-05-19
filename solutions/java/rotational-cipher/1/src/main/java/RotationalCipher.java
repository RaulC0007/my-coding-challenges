class RotationalCipher {
    private final int shiftKey;

    RotationalCipher(int shiftKey) {
        this.shiftKey = shiftKey;
    }

    String rotate(String data) {
        StringBuilder result = new StringBuilder();
        
        for (char c : data.toCharArray()) {
            if (c >= 'a' && c <= 'z') {
                // Shift lowercase letters, wrap around with modulo
                result.append((char) ('a' + (c - 'a' + shiftKey) % 26));
            } else if (c >= 'A' && c <= 'Z') {
                // Shift uppercase letters, wrap around with modulo
                result.append((char) ('A' + (c - 'A' + shiftKey) % 26));
            } else {
                // Preserve spaces, punctuation, numbers, etc.
                result.append(c);
            }
        }
        
        return result.toString();
    }
}