import java.util.Random;

public class Cipher {
    private final String key;
    private static final String ALPHABET = "abcdefghijklmnopqrstuvwxyz";
    private static final int ALPHABET_SIZE = 26;
    private static final int MIN_KEY_LENGTH = 100;
    
    // Default constructor: generates a random key of at least 100 characters
    public Cipher() {
        this.key = generateRandomKey();
    }
    
    // Constructor with a specific key
    public Cipher(String key) {
        if (key == null || key.isEmpty() || !key.matches("[a-z]+")) {
            throw new IllegalArgumentException("Key must contain only lowercase letters");
        }
        this.key = key;
    }
    
    // Generate a random key of at least 100 lowercase letters
    private String generateRandomKey() {
        Random random = new Random();
        StringBuilder sb = new StringBuilder();
        int length = MIN_KEY_LENGTH + random.nextInt(101); // at least 100, up to 200
        
        for (int i = 0; i < length; i++) {
            char c = (char) ('a' + random.nextInt(ALPHABET_SIZE));
            sb.append(c);
        }
        
        return sb.toString();
    }
    
    // Get the key
    public String getKey() {
        return key;
    }
    
    // Encode plaintext using the Vigenère cipher
    public String encode(String plainText) {
        if (plainText == null || plainText.isEmpty()) {
            return "";
        }
        
        StringBuilder result = new StringBuilder();
        int keyIndex = 0;
        
        for (int i = 0; i < plainText.length(); i++) {
            char c = plainText.charAt(i);
            
            // Only encode lowercase letters, pass others through unchanged
            if (c >= 'a' && c <= 'z') {
                int shift = key.charAt(keyIndex % key.length()) - 'a';
                char encoded = (char) ('a' + ((c - 'a' + shift) % ALPHABET_SIZE));
                result.append(encoded);
                keyIndex++;
            } else {
                result.append(c);
            }
        }
        
        return result.toString();
    }
    
    // Decode ciphertext using the Vigenère cipher
    public String decode(String cipherText) {
        if (cipherText == null || cipherText.isEmpty()) {
            return "";
        }
        
        StringBuilder result = new StringBuilder();
        int keyIndex = 0;
        
        for (int i = 0; i < cipherText.length(); i++) {
            char c = cipherText.charAt(i);
            
            // Only decode lowercase letters, pass others through unchanged
            if (c >= 'a' && c <= 'z') {
                int shift = key.charAt(keyIndex % key.length()) - 'a';
                char decoded = (char) ('a' + ((c - 'a' - shift + ALPHABET_SIZE) % ALPHABET_SIZE));
                result.append(decoded);
                keyIndex++;
            } else {
                result.append(c);
            }
        }
        
        return result.toString();
    }
}