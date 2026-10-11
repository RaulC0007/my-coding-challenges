package pangram

import "strings"

// IsPangram checks if a string is a pangram (contains all letters of the English alphabet at least once).
func IsPangram(input string) bool {
	var mask int32
	for _, r := range strings.ToLower(input) {
		if r >= 'a' && r <= 'z' {
			mask |= 1 << uint(r-'a')
		}
	}
	return mask == (1<<26)-1
}