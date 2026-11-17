package eliudseggs

func EggCount(displayValue int) int {
	count := 0
	for displayValue > 0 {
		// Check if the least significant bit is 1
		if displayValue&1 == 1 {
			count++
		}
		// Shift right by 1 bit
		displayValue >>= 1
	}
	return count
}