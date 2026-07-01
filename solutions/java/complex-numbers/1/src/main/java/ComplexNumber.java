class ComplexNumber {
    private final double real;
    private final double imaginary;

    ComplexNumber(double real, double imaginary) {
        this.real = real;
        this.imaginary = imaginary;
    }

    double getReal() {
        return real;
    }

    double getImaginary() {
        return imaginary;
    }

    double abs() {
        // |z| = sqrt(a^2 + b^2)
        return Math.sqrt(real * real + imaginary * imaginary);
    }

    ComplexNumber add(ComplexNumber other) {
        // (a + c) + (b + d) * i
        return new ComplexNumber(this.real + other.real, this.imaginary + other.imaginary);
    }

    ComplexNumber subtract(ComplexNumber other) {
        // (a - c) + (b - d) * i
        return new ComplexNumber(this.real - other.real, this.imaginary - other.imaginary);
    }

    ComplexNumber multiply(ComplexNumber other) {
        // (a * c - b * d) + (b * c + a * d) * i
        double newReal = this.real * other.real - this.imaginary * other.imaginary;
        double newImaginary = this.imaginary * other.real + this.real * other.imaginary;
        return new ComplexNumber(newReal, newImaginary);
    }

    ComplexNumber divide(ComplexNumber other) {
        // (a * c + b * d) / (c^2 + d^2) + (b * c - a * d) / (c^2 + d^2) * i
        double denominator = other.real * other.real + other.imaginary * other.imaginary;
        double newReal = (this.real * other.real + this.imaginary * other.imaginary) / denominator;
        double newImaginary = (this.imaginary * other.real - this.real * other.imaginary) / denominator;
        return new ComplexNumber(newReal, newImaginary);
    }

    ComplexNumber conjugate() {
        // a - b * i
        return new ComplexNumber(this.real, -this.imaginary);
    }

    ComplexNumber exponentialOf() {
        // e^(a + b * i) = e^a * (cos(b) + i * sin(b))
        double expReal = Math.exp(this.real);
        double newReal = expReal * Math.cos(this.imaginary);
        double newImaginary = expReal * Math.sin(this.imaginary);
        return new ComplexNumber(newReal, newImaginary);
    }
}