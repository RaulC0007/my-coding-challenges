import java.util.List;
import java.util.ArrayList;
import java.util.Objects;

class PythagoreanTriplet {
    // Campos públicos y finales para acceso directo, más getters por si el test los usa
    public final int a;
    public final int b;
    public final int c;

    PythagoreanTriplet(int a, int b, int c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }

    public int getA() { return a; }
    public int getB() { return b; }
    public int getC() { return c; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PythagoreanTriplet that = (PythagoreanTriplet) o;
        return a == that.a && b == that.b && c == that.c;
    }

    @Override
    public int hashCode() {
        return Objects.hash(a, b, c);
    }

    static TripletListBuilder makeTripletsList() {
        return new TripletListBuilder();
    }

    static class TripletListBuilder {
        private int sum;
        private int maxFactor = Integer.MAX_VALUE;

        TripletListBuilder thatSumTo(int sum) {
            this.sum = sum;
            return this;
        }

        TripletListBuilder withFactorsLessThanOrEqualTo(int maxFactor) {
            this.maxFactor = maxFactor;
            return this;
        }

        List<PythagoreanTriplet> build() {
            List<PythagoreanTriplet> triplets = new ArrayList<>();
            
            // Matemáticamente, dado a < b < c y a + b + c = sum, 
            // se cumple que 3a < sum, por lo que a < sum / 3.
            for (int a = 1; a <= sum / 3; a++) {
                if (a > maxFactor) break;
                
                // Derivado de sustituir c = sum - a - b en a^2 + b^2 = c^2
                // Obtenemos la fórmula: b = sum * (sum - 2a) / (2 * (sum - a))
                long numerator = (long) sum * (sum - 2 * a);
                long denominator = 2L * (sum - a);
                
                // Solo nos interesa si 'b' es un número entero exacto
                if (numerator % denominator == 0) {
                    int b = (int) (numerator / denominator);
                    int c = sum - a - b;
                    
                    // Verificamos las condiciones del problema
                    if (a < b && b < c && c <= maxFactor) {
                        triplets.add(new PythagoreanTriplet(a, b, c));
                    }
                }
            }
            return triplets;
        }
    }
}