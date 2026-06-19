class BottleSong {
    private static final String[] NUMBERS = {
        "No", "One", "Two", "Three", "Four", 
        "Five", "Six", "Seven", "Eight", "Nine", "Ten"
    };
    
    String recite(int startBottles, int takeDown) {
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < takeDown; i++) {
            int current = startBottles - i;
            if (i > 0) {
                result.append("\n");
            }
            result.append(verse(current));
        }
        return result.toString();
    }
    
    private String verse(int n) {
        String current = NUMBERS[n];
        String next = NUMBERS[n - 1].toLowerCase();
        String currentBottles = bottleWord(n);
        String nextBottles = bottleWord(n - 1);
        
        String hangingLine = current + " green " + currentBottles + " hanging on the wall,\n";
        String fallLine = "And if one green bottle should accidentally fall,\n";
        String resultLine = "There'll be " + next + " green " + nextBottles + " hanging on the wall.\n";
        
        return hangingLine + hangingLine + fallLine + resultLine;
    }
    
    private String bottleWord(int n) {
        return n == 1 ? "bottle" : "bottles";
    }
}