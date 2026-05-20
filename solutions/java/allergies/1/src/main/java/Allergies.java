import java.util.List;
import java.util.ArrayList;

class Allergies {
    private final int score;

    Allergies(int score) {
        // Mask to ignore bits beyond the 8 known allergens (128)
        this.score = score & 0xFF;
    }

    boolean isAllergicTo(Allergen allergen) {
        // Check if the allergen's bit is set in the score
        return (score & allergen.getScore()) != 0;
    }

    List<Allergen> getList() {
        List<Allergen> allergies = new ArrayList<>();
        // Iterate in enum declaration order to match test expectations
        for (Allergen allergen : Allergen.values()) {
            if (isAllergicTo(allergen)) {
                allergies.add(allergen);
            }
        }
        return allergies;
    }
}