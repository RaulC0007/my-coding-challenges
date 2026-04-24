import java.util.Random;
import java.util.List;
import java.util.ArrayList;
import java.util.Collections;

class DnDCharacter {
    private final int strength;
    private final int dexterity;
    private final int constitution;
    private final int intelligence;
    private final int wisdom;
    private final int charisma;
    private final int hitpoints;

    private static final Random RANDOM = new Random();

    DnDCharacter() {
        this.strength = ability();
        this.dexterity = ability();
        this.constitution = ability();
        this.intelligence = ability();
        this.wisdom = ability();
        this.charisma = ability();
        this.hitpoints = 10 + modifier(this.constitution);
    }

    // Task: Roll 4d6 and return as a list
    List<Integer> rollDice() {
        List<Integer> rolls = new ArrayList<>();
        for (int i = 0; i < 4; i++) {
            rolls.add(RANDOM.nextInt(6) + 1); // 1-6
        }
        return rolls;
    }

    // Task: Calculate ability score from a list of 4 dice rolls
    int ability(List<Integer> rolls) {
        // Sort to easily identify the lowest value
        List<Integer> sorted = new ArrayList<>(rolls);
        Collections.sort(sorted);
        // Sum the top 3 (skip index 0 which is the lowest)
        return sorted.get(1) + sorted.get(2) + sorted.get(3);
    }

    // Convenience overload: roll dice internally and calculate ability
    int ability() {
        return ability(rollDice());
    }

    // Calculate ability modifier: floor((score - 10) / 2)
    static int modifier(int score) {
        return Math.floorDiv(score - 10, 2);
    }

    // Getters for ability scores
    int getStrength() { return strength; }
    int getDexterity() { return dexterity; }
    int getConstitution() { return constitution; }
    int getIntelligence() { return intelligence; }
    int getWisdom() { return wisdom; }
    int getCharisma() { return charisma; }
    int getHitpoints() { return hitpoints; }
}