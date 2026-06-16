class Triangle {
    private final double side1;
    private final double side2;
    private final double side3;
    
    Triangle(double side1, double side2, double side3) throws TriangleException {
        // Validate all sides are positive
        if (side1 <= 0 || side2 <= 0 || side3 <= 0) {
            throw new TriangleException();
        }
        
        // Validate triangle inequality: sum of any two sides must be >= third side
        if (side1 + side2 < side3 || side2 + side3 < side1 || side1 + side3 < side2) {
            throw new TriangleException();
        }
        
        this.side1 = side1;
        this.side2 = side2;
        this.side3 = side3;
    }

    boolean isEquilateral() {
        return side1 == side2 && side2 == side3;
    }

    boolean isIsosceles() {
        // At least two sides equal (includes equilateral triangles)
        return side1 == side2 || side2 == side3 || side1 == side3;
    }

    boolean isScalene() {
        // All sides different
        return side1 != side2 && side2 != side3 && side1 != side3;
    }
}
