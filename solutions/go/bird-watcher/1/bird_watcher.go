package birdwatcher

// TotalBirdCount return the total bird count by summing
// the individual day's counts.
func TotalBirdCount(birdsPerDay []int) int {
	total := 0
	for _, count := range birdsPerDay {
		total += count
	}
	return total
}

// BirdsInWeek returns the total bird count by summing
// only the items belonging to the given week.
func BirdsInWeek(birdsPerDay []int, week int) int {
	// Calculate the start index for the given week (0-based)
	startIndex := (week - 1) * 7
	endIndex := startIndex + 7
	
	// Sum the bird counts for the specified week
	total := 0
	for i := startIndex; i < endIndex && i < len(birdsPerDay); i++ {
		total += birdsPerDay[i]
	}
	return total
}

// FixBirdCountLog returns the bird counts after correcting
// the bird counts for alternate days.
func FixBirdCountLog(birdsPerDay []int) []int {
	// The bird was present on the first day (index 0) and every second day
	// So we need to add 1 to every even index (0, 2, 4, 6, ...)
	for i := 0; i < len(birdsPerDay); i += 2 {
		birdsPerDay[i]++
	}
	return birdsPerDay
}