package scrabblescore

import "strings"

// Score calcula la puntuación total de Scrabble para una palabra dada.
func Score(input string) int {
	totalScore := 0

	// Convertimos la palabra a mayúsculas para simplificar la búsqueda
	upperInput := strings.ToUpper(input)

	for _, char := range upperInput {
		switch char {
		case 'A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T':
			totalScore += 1
		case 'D', 'G':
			totalScore += 2
		case 'B', 'C', 'M', 'P':
			totalScore += 3
		case 'F', 'H', 'V', 'W', 'Y':
			totalScore += 4
		case 'K':
			totalScore += 5
		case 'J', 'X':
			totalScore += 8
		case 'Q', 'Z':
			totalScore += 10
		}
	}

	return totalScore
}