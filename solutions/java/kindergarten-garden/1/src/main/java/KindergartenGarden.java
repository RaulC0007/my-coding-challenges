import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;

class KindergartenGarden {
    // Students in alphabetical order - determines garden column assignment
    private static final List<String> STUDENTS = Arrays.asList(
        "Alice", "Bob", "Charlie", "David", "Eve", "Fred",
        "Ginny", "Harriet", "Ileana", "Joseph", "Kincaid", "Larry"
    );
    
    private final String[] rows;
    
    KindergartenGarden(String garden) {
        // Split the diagram into two rows by newline
        this.rows = garden.split("\n");
    }

    List<Plant> getPlantsOfStudent(String student) {
        // Find student's index (0 = Alice, 1 = Bob, etc.)
        int index = STUDENTS.indexOf(student);
        if (index == -1) {
            throw new IllegalArgumentException("Unknown student: " + student);
        }
        
        // Each student gets 2 consecutive cups per row, starting at column index*2
        int startCol = index * 2;
        
        List<Plant> plants = new ArrayList<>(4);
        
        // Row 0 (nearest windows): 2 plants
        plants.add(Plant.getPlant(rows[0].charAt(startCol)));
        plants.add(Plant.getPlant(rows[0].charAt(startCol + 1)));
        
        // Row 1: 2 plants
        plants.add(Plant.getPlant(rows[1].charAt(startCol)));
        plants.add(Plant.getPlant(rows[1].charAt(startCol + 1)));
        
        return plants;
    }
}