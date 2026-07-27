import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

class CustomSet<T> {
    // Usamos un HashSet internamente para garantizar la unicidad de los elementos 
    // y obtener búsquedas en tiempo O(1).
    private final Set<T> elements;

    CustomSet() {
        this.elements = new HashSet<>();
    }

    CustomSet(Collection<T> data) {
        this.elements = new HashSet<>(data);
    }

    boolean isEmpty() {
        return elements.isEmpty();
    }

    boolean contains(T element) {
        return elements.contains(element);
    }

    boolean isDisjoint(CustomSet<T> other) {
        // Dos conjuntos son disjuntos si no comparten ningún elemento
        for (T element : this.elements) {
            if (other.contains(element)) {
                return false;
            }
        }
        return true;
    }

    boolean add(T element) {
        return elements.add(element);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (!(obj instanceof CustomSet)) return false;
        CustomSet<?> other = (CustomSet<?>) obj;
        // Dos conjuntos son iguales si tienen exactamente los mismos elementos
        return this.elements.equals(other.elements);
    }

    @Override
    public int hashCode() {
        return elements.hashCode();
    }

    CustomSet<T> getIntersection(CustomSet<T> other) {
        CustomSet<T> result = new CustomSet<>();
        for (T element : this.elements) {
            if (other.contains(element)) {
                result.add(element);
            }
        }
        return result;
    }

    CustomSet<T> getUnion(CustomSet<T> other) {
        CustomSet<T> result = new CustomSet<>(this.elements);
        for (T element : other.elements) {
            result.add(element);
        }
        return result;
    }

    CustomSet<T> getDifference(CustomSet<T> other) {
        CustomSet<T> result = new CustomSet<>();
        for (T element : this.elements) {
            if (!other.contains(element)) {
                result.add(element);
            }
        }
        return result;
    }

    boolean isSubset(CustomSet<T> other) {
        // 🔧 FIX: El conjunto de pruebas de Exercism espera que este método 
        // compruebe si 'other' es un subconjunto de 'this' (this contiene a other).
        // Usamos containsAll() para cumplir con esta lógica de forma eficiente.
        return this.elements.containsAll(other.elements);
    }
}
