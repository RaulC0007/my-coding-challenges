class Scrabble {
    private final String word;

    Scrabble(String word) {
        this.word = word;
    }

    int getScore() {
        int score = 0;
        // Handle null input gracefully
        if (word == null) {
            return 0;
        }
        
        // Iterate through the string, converting each char to uppercase
        for (int i = 0; i < word.length(); i++) {
            char c = Character.toUpperCase(word.charAt(i));
            
            // Add points based on the letter value
            switch (c) {
                case 'A': case 'E': case 'I': case 'O': case 'U':
                case 'L': case 'N': case 'R': case 'S': case 'T':
                    score += 1;
                    break;
                case 'D': case 'G':
                    score += 2;
                    break;
                case 'B': case 'C': case 'M': case 'P':
                    score += 3;
                    break;
                case 'F': case 'H': case 'V': case 'W': case 'Y':
                    score += 4;
                    break;
                case 'K':
                    score += 5;
                    break;
                case 'J': case 'X':
                    score += 8;
                    break;
                case 'Q': case 'Z':
                    score += 10;
                    break;
                default:
                    // Non-letter characters (like spaces) add 0 points
                    break;
            }
        }
        return score;
    }
}