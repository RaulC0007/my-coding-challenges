class CryptoSquare {
    private final String normalized;

    CryptoSquare(String plaintext) {
        // Normalize: lowercase and remove non-alphanumeric characters
        this.normalized = plaintext.toLowerCase().replaceAll("[^a-z0-9]", "");
    }

    String getCiphertext() {
        if (normalized.isEmpty()) {
            return "";
        }

        int length = normalized.length();
        
        // Calculate rectangle dimensions (c >= r, c - r <= 1, r * c >= length)
        int c = (int) Math.ceil(Math.sqrt(length));
        int r = (int) Math.ceil((double) length / c);
        
        // Pad the normalized string with spaces to fill the rectangle perfectly
        StringBuilder padded = new StringBuilder(normalized);
        while (padded.length() < r * c) {
            padded.append(' ');
        }
        
        // Read down the columns to form chunks
        StringBuilder result = new StringBuilder();
        for (int col = 0; col < c; col++) {
            if (col > 0) {
                result.append(' ');
            }
            for (int row = 0; row < r; row++) {
                result.append(padded.charAt(row * c + col));
            }
        }
        
        return result.toString();
    }
}