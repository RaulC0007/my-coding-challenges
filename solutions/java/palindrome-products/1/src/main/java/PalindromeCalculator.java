import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.SortedMap;
import java.util.TreeMap;

class PalindromeCalculator {

    SortedMap<Long, List<List<Integer>>> getPalindromeProductsWithFactors(int minFactor, int maxFactor) {
        // 🔧 FIX: Actualizado el mensaje de la excepción para que coincida exactamente con la prueba
        if (minFactor > maxFactor) {
            throw new IllegalArgumentException("invalid input: min must be <= max");
        }

        long minPal = Long.MAX_VALUE;
        List<List<Integer>> minFactors = new ArrayList<>();
        
        long maxPal = -1;
        List<List<Integer>> maxFactors = new ArrayList<>();

        // Búsqueda del palíndromo más pequeño
        for (int i = minFactor; i <= maxFactor; i++) {
            // Si el cuadrado de i ya es mayor que el mínimo encontrado, 
            // cualquier producto i * j (donde j >= i) será aún mayor.
            if ((long) i * i > minPal) {
                break;
            }
            for (int j = i; j <= maxFactor; j++) {
                long product = (long) i * j;
                // Como j va en aumento, si el producto supera el mínimo, podemos romper el bucle interno
                if (product > minPal) {
                    break;
                }
                if (isPalindrome(product)) {
                    if (product < minPal) {
                        minPal = product;
                        minFactors.clear();
                        minFactors.add(Arrays.asList(i, j));
                    } else if (product == minPal) {
                        minFactors.add(Arrays.asList(i, j));
                    }
                }
            }
        }

        // Búsqueda del palíndromo más grande
        for (int i = maxFactor; i >= minFactor; i--) {
            // Si el producto máximo posible para este i (i * maxFactor) es menor que el máximo encontrado,
            // cualquier producto i * j (donde j <= maxFactor) será aún menor.
            if ((long) i * maxFactor < maxPal) {
                break;
            }
            for (int j = maxFactor; j >= i; j--) {
                long product = (long) i * j;
                // Como j va en disminución, si el producto es menor que el máximo, podemos romper el bucle interno
                if (product < maxPal) {
                    break;
                }
                if (isPalindrome(product)) {
                    if (product > maxPal) {
                        maxPal = product;
                        maxFactors.clear();
                        maxFactors.add(Arrays.asList(i, j));
                    } else if (product == maxPal) {
                        maxFactors.add(Arrays.asList(i, j));
                    }
                }
            }
        }

        // Construimos el mapa ordenado con los resultados
        SortedMap<Long, List<List<Integer>>> result = new TreeMap<>();
        if (minPal != Long.MAX_VALUE) {
            result.put(minPal, minFactors);
        }
        if (maxPal != -1) {
            result.put(maxPal, maxFactors);
        }

        return result;
    }

    // Método auxiliar para verificar si un número es palíndromo
    private boolean isPalindrome(long n) {
        if (n < 0) return false;
        long original = n;
        long reversed = 0;
        while (n > 0) {
            reversed = reversed * 10 + (n % 10);
            n /= 10;
        }
        return original == reversed;
    }
}