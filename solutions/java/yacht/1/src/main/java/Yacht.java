import java.util.Arrays;

class Yacht {
    private final int[] dice;
    private final YachtCategory category;
    
    Yacht(int[] dice, YachtCategory yachtCategory) {
        // Defensive copy to prevent external mutation
        this.dice = dice.clone();
        this.category = yachtCategory;
    }

    int score() {
        switch (category) {
            case YACHT:
                return scoreYacht();
            case ONES:
                return scoreNumber(1);
            case TWOS:
                return scoreNumber(2);
            case THREES:
                return scoreNumber(3);
            case FOURS:
                return scoreNumber(4);
            case FIVES:
                return scoreNumber(5);
            case SIXES:
                return scoreNumber(6);
            case FULL_HOUSE:
                return scoreFullHouse();
            case FOUR_OF_A_KIND:
                return scoreFourOfAKind();
            case LITTLE_STRAIGHT:
                return scoreLittleStraight();
            case BIG_STRAIGHT:
                return scoreBigStraight();
            case CHOICE:
                return scoreChoice();
            default:
                return 0;
        }
    }
    
    // Helper: Score number categories (ONES through SIXES)
    private int scoreNumber(int number) {
        int count = 0;
        for (int die : dice) {
            if (die == number) count++;
        }
        return count * number;
    }
    
    // Helper: YACHT - all five dice the same
    private int scoreYacht() {
        int first = dice[0];
        for (int die : dice) {
            if (die != first) return 0;
        }
        return 50;
    }
    
    // Helper: FULL_HOUSE - three of one kind + two of another
    private int scoreFullHouse() {
        int[] counts = countDice();
        
        boolean hasThree = false, hasTwo = false;
        for (int count : counts) {
            if (count == 3) hasThree = true;
            if (count == 2) hasTwo = true;
        }
        
        // Note: Yacht (5 of a kind) does NOT count as Full House
        if (hasThree && hasTwo) {
            return sumDice();
        }
        return 0;
    }
    
    // Helper: FOUR_OF_A_KIND - at least four dice showing same face
    private int scoreFourOfAKind() {
        int[] counts = countDice();
        
        for (int face = 1; face <= 6; face++) {
            if (counts[face] >= 4) {
                return face * 4; // Score sum of the four matching dice
            }
        }
        return 0;
    }
    
    // Helper: LITTLE_STRAIGHT - 1-2-3-4-5
    private int scoreLittleStraight() {
        return isStraight(new int[]{1, 2, 3, 4, 5}) ? 30 : 0;
    }
    
    // Helper: BIG_STRAIGHT - 2-3-4-5-6
    private int scoreBigStraight() {
        return isStraight(new int[]{2, 3, 4, 5, 6}) ? 30 : 0;
    }
    
    // Helper: CHOICE - sum of all dice (always valid)
    private int scoreChoice() {
        return sumDice();
    }
    
    // Utility: Count occurrences of each die face (index 1-6)
    private int[] countDice() {
        int[] counts = new int[7]; // indices 0 unused, 1-6 for faces
        for (int die : dice) {
            counts[die]++;
        }
        return counts;
    }
    
    // Utility: Sum all dice values
    private int sumDice() {
        int sum = 0;
        for (int die : dice) sum += die;
        return sum;
    }
    
    // Utility: Check if dice match a target straight pattern
    private boolean isStraight(int[] target) {
        int[] sorted = dice.clone();
        Arrays.sort(sorted);
        return Arrays.equals(sorted, target);
    }
}