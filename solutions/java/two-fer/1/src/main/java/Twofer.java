public class Twofer {
    public String twofer(String name) {
        // If name is null or empty, default to "you"
        if (name == null || name.isEmpty()) {
            return "One for you, one for me.";
        }
        
        // Otherwise, use the provided name
        return "One for " + name + ", one for me.";
    }
}