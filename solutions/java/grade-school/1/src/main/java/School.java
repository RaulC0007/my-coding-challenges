import java.util.*;

class School {
    // TreeMap automatically sorts grades numerically (1, 2, 3...)
    private final Map<Integer, Set<String>> grades = new TreeMap<>();
    
    // HashSet tracks all students across all grades to prevent duplicates
    private final Set<String> allStudents = new HashSet<>();

    boolean add(String student, int grade) {
        // A student can only be added to the roster once
        if (allStudents.contains(student)) {
            return false;
        }
        
        allStudents.add(student);
        // TreeSet automatically sorts students alphabetically within the grade
        grades.computeIfAbsent(grade, k -> new TreeSet<>()).add(student);
        return true;
    }

    List<String> roster() {
        List<String> result = new ArrayList<>();
        // Iterate through grades in sorted order (guaranteed by TreeMap)
        for (Set<String> students : grades.values()) {
            // Add students in alphabetical order (guaranteed by TreeSet)
            result.addAll(students);
        }
        return result;
    }

    List<String> grade(int grade) {
        if (!grades.containsKey(grade)) {
            return Collections.emptyList();
        }
        // Return a new list to prevent external modification of the internal TreeSet
        return new ArrayList<>(grades.get(grade));
    }
}
