class ResistorColorTrio {
    private static final String[] COLORS = {
        "black", "brown", "red", "orange", "yellow", 
        "green", "blue", "violet", "grey", "white"
    };

    String label(String[] colors) {
        // 1. Calculate the base resistance in ohms using long to prevent overflow
        long firstDigit = getColorCode(colors[0]);
        long secondDigit = getColorCode(colors[1]);
        int zeros = getColorCode(colors[2]);
        
        long resistanceInOhms = (firstDigit * 10 + secondDigit) * (long) Math.pow(10, zeros);

        // 2. Determine the appropriate metric prefix
        if (resistanceInOhms >= 1_000_000_000 && resistanceInOhms % 1_000_000_000 == 0) {
            return (resistanceInOhms / 1_000_000_000) + " gigaohms";
        } else if (resistanceInOhms >= 1_000_000 && resistanceInOhms % 1_000_000 == 0) {
            return (resistanceInOhms / 1_000_000) + " megaohms";
        } else if (resistanceInOhms >= 1_000 && resistanceInOhms % 1_000 == 0) {
            return (resistanceInOhms / 1_000) + " kiloohms";
        } else {
            return resistanceInOhms + " ohms";
        }
    }

    private int getColorCode(String color) {
        for (int i = 0; i < COLORS.length; i++) {
            if (COLORS[i].equals(color)) {
                return i;
            }
        }
        throw new IllegalArgumentException("Invalid color: " + color);
    }
}