class ResistorColor {
    
    // Define the colors in order of their numeric value (0-9)
    private static final String[] COLORS = {
        "black", "brown", "red", "orange", "yellow", 
        "green", "blue", "violet", "grey", "white"
    };

    int colorCode(String color) {
        // Find the index of the color in the array, which corresponds to its value
        for (int i = 0; i < COLORS.length; i++) {
            if (COLORS[i].equals(color)) {
                return i;
            }
        }
        // Should not happen with valid input, but good practice to handle it
        throw new IllegalArgumentException("Invalid color: " + color);
    }

    String[] colors() {
        // Return the full list of colors
        return COLORS.clone(); // Return a copy to prevent external modification
    }
}