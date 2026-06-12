import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

class ChangeCalculator {
    private final List<Integer> currencyCoins;

    ChangeCalculator(List<Integer> currencyCoins) {
        this.currencyCoins = currencyCoins;
    }

    List<Integer> computeMostEfficientChange(int grandTotal) {
        // 1. Validación de entrada
        if (grandTotal < 0) {
            // 🔧 FIX: Cambiado el mensaje para que coincida exactamente con la prueba
            throw new IllegalArgumentException("Negative totals are not allowed.");
        }
        
        // Caso base: si el cambio es 0, no se necesitan monedas
        if (grandTotal == 0) {
            return new ArrayList<>();
        }

        // 2. Programación Dinámica (DP)
        // dp[i] almacenará el número mínimo de monedas para hacer el monto 'i'
        int[] dp = new int[grandTotal + 1];
        // coinUsed[i] almacenará la última moneda usada para llegar al monto 'i' (para reconstruir la solución)
        int[] coinUsed = new int[grandTotal + 1];
        
        Arrays.fill(dp, Integer.MAX_VALUE);
        dp[0] = 0; // 0 monedas para hacer el monto 0

        for (int i = 1; i <= grandTotal; i++) {
            for (int coin : currencyCoins) {
                // Si la moneda es menor o igual al monto actual Y podemos formar el monto restante
                if (i >= coin && dp[i - coin] != Integer.MAX_VALUE) {
                    // Si encontramos una forma más eficiente, actualizamos
                    if (dp[i - coin] + 1 < dp[i]) {
                        dp[i] = dp[i - coin] + 1;
                        coinUsed[i] = coin;
                    }
                }
            }
        }

        // 3. Verificar si es posible dar cambio
        if (dp[grandTotal] == Integer.MAX_VALUE) {
            throw new IllegalArgumentException("The total " + grandTotal + " cannot be represented in the given currency.");
        }

        // 4. Reconstruir la lista de monedas usadas
        List<Integer> result = new ArrayList<>();
        int curr = grandTotal;
        while (curr > 0) {
            int coin = coinUsed[curr];
            result.add(coin);
            curr -= coin;
        }
        
        // Ordenamos la lista de monedas de menor a mayor (como se muestra en los ejemplos)
        Collections.sort(result);
        return result;
    }
}