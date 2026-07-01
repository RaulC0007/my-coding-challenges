public class SquareRoot {
    public int squareRoot(int radicand) {
        // Handle base cases
        if (radicand < 2) {
            return radicand; // sqrt(0)=0, sqrt(1)=1
        }
        
        // Binary search for the square root
        // sqrt(n) <= n/2 for all n >= 4, so we can limit our search range
        int left = 1;
        int right = radicand / 2;
        
        while (left <= right) {
            // Calculate mid safely to avoid potential overflow
            int mid = left + (right - left) / 2;
            
            // Use long to prevent overflow when squaring large integers
            long square = (long) mid * mid;
            
            if (square == radicand) {
                // Found exact square root
                return mid;
            } else if (square < radicand) {
                // mid is too small, search upper half
                left = mid + 1;
            } else {
                // mid is too large, search lower half
                right = mid - 1;
            }
        }
        
        // For perfect squares (as guaranteed by the problem), we always return above.
        // This fallback handles edge cases or returns floor(sqrt) if needed.
        return right;
    }
}