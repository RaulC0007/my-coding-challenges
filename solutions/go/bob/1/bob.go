package bob

import (
	"strings"
	"unicode"
)

// Hey returns Bob's response based on the input remark.
func Hey(remark string) string {
	remark = strings.TrimSpace(remark)

	if remark == "" {
		return "Fine. Be that way!"
	}

	isQuestion := strings.HasSuffix(remark, "?")
	
	hasLetters := false
	isAllUpper := true
	for _, r := range remark {
		if unicode.IsLetter(r) {
			hasLetters = true
			if !unicode.IsUpper(r) {
				isAllUpper = false
			}
		}
	}
	isYelling := hasLetters && isAllUpper

	if isYelling && isQuestion {
		return "Calm down, I know what I'm doing!"
	}
	if isYelling {
		return "Whoa, chill out!"
	}
	if isQuestion {
		return "Sure."
	}
	return "Whatever."
}