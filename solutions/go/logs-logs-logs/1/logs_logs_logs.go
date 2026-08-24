package logs

import "unicode/utf8"

// Application identifies the application emitting the given log.
func Application(log string) string {
	// Define the application markers with their Unicode code points
	recommendation := '❗' // U+2757
	search := '🔍'        // U+1F50D
	weather := '☀'        // U+2600
	
	// Iterate through the log string to find the first matching character
	for _, char := range log {
		switch char {
		case recommendation:
			return "recommendation"
		case search:
			return "search"
		case weather:
			return "weather"
		}
	}
	
	// No matching character found
	return "default"
}

// Replace replaces all occurrences of old with new, returning the modified log
// to the caller.
func Replace(log string, oldRune, newRune rune) string {
	// Convert the string to a slice of runes for replacement
	runes := []rune(log)
	
	// Replace all occurrences of oldRune with newRune
	for i, char := range runes {
		if char == oldRune {
			runes[i] = newRune
		}
	}
	
	// Convert back to a string and return
	return string(runes)
}

// WithinLimit determines whether or not the number of characters in log is
// within the limit.
func WithinLimit(log string, limit int) bool {
	// Count the number of runes (characters) in the log
	charCount := utf8.RuneCountInString(log)
	
	// Return true if the character count is within the limit
	return charCount <= limit
}