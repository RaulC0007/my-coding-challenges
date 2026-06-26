import java.util.HashSet;
import java.util.Random;
import java.util.Set;

class Robot {
    // Global set to track all currently assigned names for uniqueness
    private static final Set<String> USED_NAMES = new HashSet<>();
    private static final Random RANDOM = new Random();
    
    // Lazy-initialized name for this instance
    private String name;

    String getName() {
        // Generate name only on first request
        if (name == null) {
            String newName;
            // Keep generating until we find a unique name
            do {
                newName = generateRandomName();
            } while (!USED_NAMES.add(newName));
            name = newName;
        }
        return name;
    }

    void reset() {
        if (name != null) {
            // Release old name back to the pool
            USED_NAMES.remove(name);
            // Clear reference so next getName() generates a new one
            name = null;
        }
    }

    private String generateRandomName() {
        char letter1 = (char) ('A' + RANDOM.nextInt(26));
        char letter2 = (char) ('A' + RANDOM.nextInt(26));
        int digit1 = RANDOM.nextInt(10);
        int digit2 = RANDOM.nextInt(10);
        int digit3 = RANDOM.nextInt(10);
        return String.format("%c%c%d%d%d", letter1, letter2, digit1, digit2, digit3);
    }
}