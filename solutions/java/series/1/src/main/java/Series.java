import java.util.ArrayList;
import java.util.List;

class Series {
    private final String string;

    Series(String string) {
        // 🔧 FIX: Validate empty string in constructor
        if (string.isEmpty()) {
            throw new IllegalArgumentException("series cannot be empty");
        }
        this.string = string;
    }

    List<String> slices(int num) {
        // 🔧 FIX: Combine negative/zero checks with exact message
        if (num <= 0) {
            throw new IllegalArgumentException("slice length cannot be negative or zero");
        }
        if (num > string.length()) {
            throw new IllegalArgumentException("slice length cannot be greater than series length");
        }

        List<String> result = new ArrayList<>();
        for (int i = 0; i <= string.length() - num; i++) {
            result.add(string.substring(i, i + num));
        }
        return result;
    }
}