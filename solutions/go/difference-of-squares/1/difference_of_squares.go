package differenceofsquares

func SquareOfSum(n int) int {
	// Sum of first n natural numbers: n * (n + 1) / 2
	sum := n * (n + 1) / 2
	return sum * sum
}

func SumOfSquares(n int) int {
	// Sum of squares of first n natural numbers: n * (n + 1) * (2n + 1) / 6
	return n * (n + 1) * (2*n + 1) / 6
}

func Difference(n int) int {
	return SquareOfSum(n) - SumOfSquares(n)
}