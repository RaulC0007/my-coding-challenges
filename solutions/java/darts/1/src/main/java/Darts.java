class Darts {
    int score(double xOfDart, double yOfDart) {
        // Calculate squared distance from center (0,0)
        double distanceSquared = xOfDart * xOfDart + yOfDart * yOfDart;
        
        if (distanceSquared <= 1.0) {
            return 10; // Inner circle (radius 1)
        } else if (distanceSquared <= 25.0) {
            return 5;  // Middle circle (radius 5)
        } else if (distanceSquared <= 100.0) {
            return 1;  // Outer circle (radius 10)
        }
        
        return 0; // Outside the target
    }
}