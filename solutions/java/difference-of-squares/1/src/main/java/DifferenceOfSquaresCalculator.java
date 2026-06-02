class DifferenceOfSquaresCalculator {

    int computeSquareOfSumTo(int input) {
        // Sum of 1 to N: n(n+1)/2
        int sum = input * (input + 1) / 2;
        return sum * sum;
    }

    int computeSumOfSquaresTo(int input) {
        // Sum of squares 1² to N²: n(n+1)(2n+1)/6
        return input * (input + 1) * (2 * input + 1) / 6;
    }

    int computeDifferenceOfSquares(int input) {
        return computeSquareOfSumTo(input) - computeSumOfSquaresTo(input);
    }
}