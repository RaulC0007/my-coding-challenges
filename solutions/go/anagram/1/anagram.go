package anagram

import (
	"sort"
	"strings"
)

// sortRunes convierte una cadena en minúsculas a una rebanada de runes ordenados.
func sortRunes(s string) string {
	runes := []rune(strings.ToLower(s))
	sort.Slice(runes, func(i, j int) bool {
		return runes[i] < runes[j]
	})
	return string(runes)
}

// Detect devuelve las candidatas que son anagramas del sujeto.
func Detect(subject string, candidates []string) []string {
	subjectLower := strings.ToLower(subject)
	subjectSorted := sortRunes(subject)

	var result []string

	for _, candidate := range candidates {
		candidateLower := strings.ToLower(candidate)

		// Regla 1: Una palabra no es anagrama de sí misma (insensible a mayúsculas/minúsculas).
		if candidateLower == subjectLower {
			continue
		}

		// Regla 2: Un anagrama debe tener exactamente las mismas letras ordenadas.
		if sortRunes(candidate) == subjectSorted {
			result = append(result, candidate)
		}
	}

	return result
}