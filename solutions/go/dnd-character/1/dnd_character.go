package dndcharacter

import (
	"math/rand"
	"sort"
)

type Character struct {
	Strength     int
	Dexterity    int
	Constitution int
	Intelligence int
	Wisdom       int
	Charisma     int
	Hitpoints    int
}

// Modifier calculates the ability modifier for a given ability score
func Modifier(score int) int {
	// Modifier = (score - 10) / 2, rounded down (floor division)
	// In Go, integer division truncates toward zero, so we need to handle negatives carefully
	diff := score - 10
	if diff >= 0 {
		return diff / 2
	}
	// For negative values, we need floor division
	// e.g., (-3) / 2 should be -2, but Go gives -1
	return (diff - 1) / 2
}

// Ability uses randomness to generate the score for an ability
func Ability() int {
	// Roll 4 six-sided dice
	rolls := make([]int, 4)
	for i := 0; i < 4; i++ {
		rolls[i] = rand.Intn(6) + 1 // Random number between 1 and 6
	}

	// Sort rolls in ascending order
	sort.Ints(rolls)

	// Sum the largest three (discard the smallest, which is rolls[0])
	return rolls[1] + rolls[2] + rolls[3]
}

// GenerateCharacter creates a new Character with random scores for abilities
func GenerateCharacter() Character {
	strength := Ability()
	dexterity := Ability()
	constitution := Ability()
	intelligence := Ability()
	wisdom := Ability()
	charisma := Ability()

	hitpoints := 10 + Modifier(constitution)

	return Character{
		Strength:     strength,
		Dexterity:    dexterity,
		Constitution: constitution,
		Intelligence: intelligence,
		Wisdom:       wisdom,
		Charisma:     charisma,
		Hitpoints:    hitpoints,
	}
}