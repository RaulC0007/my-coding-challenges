package darts

import "math"

func Score(x, y float64) int {
	// Calculate the distance from the center using the Pythagorean theorem
	distance := math.Sqrt(x*x + y*y)
	
	// Determine the score based on the distance
	switch {
	case distance > 10:
		return 0
	case distance > 5:
		return 1
	case distance > 1:
		return 5
	default:
		return 10
	}
}