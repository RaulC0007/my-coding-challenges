class ResistorColorDuo {
    // Define the colors in order of their numeric value (0-9)
    private static final String[] COLORS = {
        "black", "brown", "red", "orange", "yellow", 
        "green", "blue", "violet", "grey", "white"
    };

    int value(String[] colors) {
        // Get the index (value) of the first two colors
        int firstDigit = getColorCode(colors[0]);
        int secondDigit = getColorCode(colors[1]);
        
        // Combine them into a two-digit number: first * 10 + second
        return firstDigit * 10 + secondDigit;
    }

    // Helper method to find the numeric code for a color
    private int getColorCode(String color) {
        for (int i = 0; i < COLORS.length; i++) {
            if (COLORS[i].equals(color)) {
                return i;
            }
        }
        throw new IllegalArgumentException("Invalid color: " + color);
    }
}