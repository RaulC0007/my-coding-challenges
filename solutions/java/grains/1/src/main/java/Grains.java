import java.math.BigInteger;

class Grains {

    BigInteger grainsOnSquare(final int square) {
        if (square < 1 || square > 64) {
            throw new IllegalArgumentException("square must be between 1 and 64");
        }
        // Square n has 2^(n-1) grains
        return BigInteger.valueOf(2).pow(square - 1);
    }

    BigInteger grainsOnBoard() {
        // Total = 2^64 - 1
        return BigInteger.valueOf(2).pow(64).subtract(BigInteger.ONE);
    }
}