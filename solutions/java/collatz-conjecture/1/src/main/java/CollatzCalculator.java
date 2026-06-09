class CollatzCalculator {

    int computeStepCount(int start) {
        // Validate input: only positive integers are allowed
        if (start <= 0) {
            throw new IllegalArgumentException("Only positive integers are allowed");
        }
        
        int steps = 0;
        int current = start;
        
        // Apply Collatz rules until we reach 1
        while (current != 1) {
            if (current % 2 == 0) {
                current /= 2;          // Even: divide by 2
            } else {
                current = 3 * current + 1; // Odd: multiply by 3 and add 1
            }
            steps++;
        }
        
        return steps;
    }
}