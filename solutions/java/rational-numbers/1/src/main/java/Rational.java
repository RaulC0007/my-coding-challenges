import java.util.Objects;

class Rational {
    private final int numerator;
    private final int denominator;

    Rational(int numerator, int denominator) {
        if (denominator == 0) {
            throw new IllegalArgumentException("Denominator cannot be zero");
        }
        
        // Forma estándar: el denominador siempre debe ser positivo
        if (denominator < 0) {
            numerator = -numerator;
            denominator = -denominator;
        }
        
        // Reducir a la mínima expresión dividiendo por el Máximo Común Divisor (GCD)
        int gcd = gcd(Math.abs(numerator), denominator);
        this.numerator = numerator / gcd;
        this.denominator = denominator / gcd;
    }

    // Algoritmo de Euclides para calcular el Máximo Común Divisor
    private int gcd(int a, int b) {
        while (b != 0) {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }

    int getNumerator() {
        return numerator;
    }

    int getDenominator() {
        return denominator;
    }

    Rational add(Rational other) {
        return new Rational(
            this.numerator * other.denominator + other.numerator * this.denominator,
            this.denominator * other.denominator
        );
    }

    Rational subtract(Rational other) {
        return new Rational(
            this.numerator * other.denominator - other.numerator * this.denominator,
            this.denominator * other.denominator
        );
    }

    Rational multiply(Rational other) {
        return new Rational(
            this.numerator * other.numerator,
            this.denominator * other.denominator
        );
    }

    Rational divide(Rational other) {
        return new Rational(
            this.numerator * other.denominator,
            this.denominator * other.numerator
        );
    }

    Rational abs() {
        return new Rational(Math.abs(numerator), denominator);
    }

    Rational pow(int power) {
        if (power < 0) {
            return new Rational(
                (int) Math.pow(denominator, -power),
                (int) Math.pow(numerator, -power)
            );
        }
        return new Rational(
            (int) Math.pow(numerator, power),
            (int) Math.pow(denominator, power)
        );
    }

    // El método exp(double base) calcula base^(numerator/denominator)
    double exp(double base) {
        return Math.pow(base, (double) numerator / denominator);
    }

    @Override
    public String toString() {
        return String.format("%d/%d", this.getNumerator(), this.getDenominator());
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof Rational other) {
            return this.getNumerator() == other.getNumerator()
                    && this.getDenominator() == other.getDenominator();
        }
        return false;
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.getNumerator(), this.getDenominator());
    }
}
