// Package acronym provides utilities for generating acronyms from phrases.
package acronym

import (
	"strings"
	"unicode"
)

// Abbreviate converts a phrase to its acronym.
func Abbreviate(s string) string {
	var acronym strings.Builder
	isNewWord := true

	for _, r := range s {
		if unicode.IsLetter(r) {
			if isNewWord {
				acronym.WriteRune(unicode.ToUpper(r))
				isNewWord = false
			}
		} else if r == ' ' || r == '-' {
			isNewWord = true
		} else {
			// Ignore all other punctuation characters
			continue
		}
	}

	return acronym.String()
}