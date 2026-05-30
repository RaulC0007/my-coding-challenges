public class AffineCipher {
    
    private static final int M = 26; // Size of Latin alphabet
    
    public String encode(String text, int coefficient1, int coefficient2){
        // Validate that a and m are coprime
        if (gcd(coefficient1, M) != 1) {
            throw new IllegalArgumentException("Error: keyA and alphabet size must be coprime.");
        }
        
        // Clean input: lowercase, remove non-alphanumeric
        String cleaned = text.toLowerCase().replaceAll("[^a-z0-9]", "");
        
        StringBuilder encoded = new StringBuilder();
        for (char c : cleaned.toCharArray()) {
            if (c >= 'a' && c <= 'z') {
                int i = c - 'a'; // Letter index 0-25
                // E(x) = (a*i + b) mod m
                int encrypted = (coefficient1 * i + coefficient2) % M;
                // Handle negative modulo results
                if (encrypted < 0) encrypted += M;
                encoded.append((char)('a' + encrypted));
            } else {
                // Digits pass through unchanged
                encoded.append(c);
            }
        }
        
        // Group output into blocks of 5
        return groupIntoFives(encoded.toString());
    }

    public String decode(String text, int coefficient1, int coefficient2){
        // Validate that a and m are coprime
        if (gcd(coefficient1, M) != 1) {
            throw new IllegalArgumentException("Error: keyA and alphabet size must be coprime.");
        }
        
        // Calculate modular multiplicative inverse of a
        int mmi = modularInverse(coefficient1, M);
        
        // Remove spaces for processing
        String cleaned = text.replaceAll(" ", "");
        
        StringBuilder decoded = new StringBuilder();
        for (char c : cleaned.toCharArray()) {
            if (c >= 'a' && c <= 'z') {
                int y = c - 'a'; // Encrypted letter index
                // D(y) = a^-1 * (y - b) mod m
                int decrypted = (mmi * (y - coefficient2)) % M;
                // Handle negative modulo results
                if (decrypted < 0) decrypted += M;
                decoded.append((char)('a' + decrypted));
            } else {
                // Digits pass through unchanged
                decoded.append(c);
            }
        }
        
        return decoded.toString();
    }
    
    // Euclidean algorithm for GCD
    private int gcd(int a, int b) {
        a = Math.abs(a);
        b = Math.abs(b);
        while (b != 0) {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
    
    // Find modular multiplicative inverse by brute force (sufficient for m=26)
    private int modularInverse(int a, int m) {
        // Normalize a to [0, m)
        a = ((a % m) + m) % m;
        for (int x = 1; x < m; x++) {
            if ((a * x) % m == 1) {
                return x;
            }
        }
        throw new IllegalArgumentException("Modular inverse does not exist");
    }
    
    // Group text into blocks of 5 separated by spaces
    private String groupIntoFives(String text) {
        StringBuilder grouped = new StringBuilder();
        for (int i = 0; i < text.length(); i++) {
            if (i > 0 && i % 5 == 0) {
                grouped.append(' ');
            }
            grouped.append(text.charAt(i));
        }
        return grouped.toString();
    }
}