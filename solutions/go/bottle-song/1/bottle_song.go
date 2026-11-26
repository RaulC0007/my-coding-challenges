package bottlesong

import (
	"fmt"
	"strings"
)

// word returns the English word for a number, with an option to capitalize the first letter.
func word(n int, capitalize bool) string {
	words := []string{"no", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"}
	
	if n >= 0 && n <= 10 {
		w := words[n]
		if capitalize {
			return strings.ToUpper(string(w[0])) + w[1:]
		}
		return w
	}
	
	// Fallback for numbers outside the 0-10 range (though the exercise typically stays within bounds)
	w := fmt.Sprintf("%d", n)
	if capitalize {
		return strings.ToUpper(string(w[0])) + w[1:]
	}
	return w
}

// bottle returns the correct singular or plural form of the word "bottle".
func bottle(n int) string {
	if n == 1 {
		return "bottle"
	}
	return "bottles"
}

// Recite generates the lyrics for the specified number of verses.
func Recite(startBottles, takeDown int) []string {
	var result []string
	
	for i := 0; i < takeDown; i++ {
		current := startBottles - i
		next := current - 1

		cWord := word(current, true)
		nWord := word(next, false)

		cBottle := bottle(current)
		nBottle := bottle(next)

		result = append(result, fmt.Sprintf("%s green %s hanging on the wall,", cWord, cBottle))
		result = append(result, fmt.Sprintf("%s green %s hanging on the wall,", cWord, cBottle))
		result = append(result, "And if one green bottle should accidentally fall,")
		result = append(result, fmt.Sprintf("There'll be %s green %s hanging on the wall.", nWord, nBottle))

		// Add an empty line between verses, but not after the final verse
		if i < takeDown-1 {
			result = append(result, "")
		}
	}
	
	return result
}