package luhn

import (
	"strings"
	"unicode"
)

func Valid(id string) bool {
	var cleaned strings.Builder
	for _, r := range id {
		if unicode.IsSpace(r) {
			continue
		}
		if !unicode.IsDigit(r) {
			return false
		}
		cleaned.WriteRune(r)
	}

	digits := cleaned.String()
	if len(digits) <= 1 {
		return false
	}

	sum := 0
	double := false

	for i := len(digits) - 1; i >= 0; i-- {
		n := int(digits[i] - '0')
		if double {
			n *= 2
			if n > 9 {
				n -= 9
			}
		}
		sum += n
		double = !double
	}

	return sum%10 == 0
}