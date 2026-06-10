import java.util.ArrayList;
import java.util.List;

class ZebraPuzzle {
    private String waterDrinker;
    private String zebraOwner;

    ZebraPuzzle() {
        solve();
    }

    String getWaterDrinker() {
        return waterDrinker;
    }

    String getZebraOwner() {
        return zebraOwner;
    }

    private void solve() {
        // Attribute Mappings:
        // Colors: 0=Red, 1=Green, 2=Ivory, 3=Yellow, 4=Blue
        // Nationalities: 0=Englishman, 1=Spaniard, 2=Ukrainian, 3=Norwegian, 4=Japanese
        // Pets: 0=Dog, 1=Snails, 2=Fox, 3=Horse, 4=Zebra
        // Drinks: 0=Coffee, 1=Tea, 2=Milk, 3=OJ, 4=Water
        // Hobbies: 0=Dancing, 1=Painting, 2=Reading, 3=Football, 4=Chess

        List<int[]> perms = generatePermutations(new int[]{0, 1, 2, 3, 4});

        for (int[] nationalities : perms) {
            if (nationalities[0] != 3) continue; // 10. The Norwegian lives in the first house.

            for (int[] colors : perms) {
                if (colors[1] != 4) continue; // 15. The Norwegian lives next to the blue house.
                if (indexOf(colors, 1) != indexOf(colors, 2) + 1) continue; // 6. Green is immediately to the right of Ivory.
                if (indexOf(nationalities, 0) != indexOf(colors, 0)) continue; // 2. The Englishman lives in the red house.

                for (int[] drinks : perms) {
                    if (drinks[2] != 2) continue; // 9. The person in the middle house drinks milk.
                    if (indexOf(colors, 1) != indexOf(drinks, 0)) continue; // 4. The person in the green house drinks coffee.
                    if (indexOf(nationalities, 2) != indexOf(drinks, 1)) continue; // 5. The Ukrainian drinks tea.

                    for (int[] hobbies : perms) {
                        if (indexOf(hobbies, 3) != indexOf(drinks, 3)) continue; // 13. The person who plays football drinks orange juice.
                        if (indexOf(nationalities, 4) != indexOf(hobbies, 4)) continue; // 14. The Japanese person plays chess.

                        for (int[] pets : perms) {
                            if (indexOf(nationalities, 1) != indexOf(pets, 0)) continue; // 3. The Spaniard owns the dog.
                            if (indexOf(pets, 1) != indexOf(hobbies, 0)) continue; // 7. The snail owner likes to go dancing.
                            if (indexOf(colors, 3) != indexOf(hobbies, 1)) continue; // 8. The person in the yellow house is a painter.
                            
                            if (Math.abs(indexOf(hobbies, 2) - indexOf(pets, 2)) != 1) continue; // 11. Reading lives next to the fox.
                            if (Math.abs(indexOf(hobbies, 1) - indexOf(pets, 3)) != 1) continue; // 12. The painter's house is next to the house with the horse.

                            // Solution found!
                            int waterHouse = indexOf(drinks, 4);
                            int zebraHouse = indexOf(pets, 4);
                            
                            waterDrinker = getNationality(nationalities[waterHouse]);
                            zebraOwner = getNationality(nationalities[zebraHouse]);
                            return;
                        }
                    }
                }
            }
        }
    }

    private int indexOf(int[] arr, int val) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == val) return i;
        }
        return -1;
    }

    private List<int[]> generatePermutations(int[] arr) {
        List<int[]> result = new ArrayList<>();
        permute(arr, 0, result);
        return result;
    }

    private void permute(int[] arr, int k, List<int[]> result) {
        if (k == arr.length) {
            result.add(arr.clone());
            return;
        }
        for (int i = k; i < arr.length; i++) {
            swap(arr, i, k);
            permute(arr, k + 1, result);
            swap(arr, i, k);
        }
    }

    private void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    private String getNationality(int id) {
        switch (id) {
            case 0: return "Englishman";
            case 1: return "Spaniard";
            case 2: return "Ukrainian";
            case 3: return "Norwegian";
            case 4: return "Japanese";
            default: return "";
        }
    }
}