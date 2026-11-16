package armstrongnumbers

import "math"

func IsNumber(n int) bool {
	if n < 0 {
		return false
	}
	if n == 0 {
		return true
	}

	temp := n
	digits := []int{}
	for temp > 0 {
		digits = append(digits, temp%10)
		temp /= 10
	}

	numDigits := len(digits)
	sum := 0
	for _, d := range digits {
		sum += int(math.Pow(float64(d), float64(numDigits)))
	}

	return sum == n
}