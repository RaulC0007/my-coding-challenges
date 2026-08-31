package chessboard

// Declare a type named File which stores if a square is occupied by a piece - this will be a slice of bools
type File []bool

// Declare a type named Chessboard which contains a map of eight Files, accessed with keys from "A" to "H"
type Chessboard map[string]File

// CountInFile returns how many squares are occupied in the chessboard,
// within the given file.
func CountInFile(cb Chessboard, file string) int {
	// Check if the file exists in the chessboard
	if _, exists := cb[file]; !exists {
		return 0
	}
	
	count := 0
	for _, occupied := range cb[file] {
		if occupied {
			count++
		}
	}
	return count
}

// CountInRank returns how many squares are occupied in the chessboard,
// within the given rank.
func CountInRank(cb Chessboard, rank int) int {
	// Check if the rank is valid (1-8)
	if rank < 1 || rank > 8 {
		return 0
	}
	
	count := 0
	// Rank is 1-indexed, but slice is 0-indexed
	rankIndex := rank - 1
	
	// Iterate over all files (A-H) in order
	files := []string{"A", "B", "C", "D", "E", "F", "G", "H"}
	for _, file := range files {
		if fileData, exists := cb[file]; exists {
			if rankIndex < len(fileData) && fileData[rankIndex] {
				count++
			}
		}
	}
	return count
}

// CountAll should count how many squares are present in the chessboard.
func CountAll(cb Chessboard) int {
	count := 0
	for range cb {
		// Count each file as having 8 ranks
		count += 8
	}
	return count
}

// CountOccupied returns how many squares are occupied in the chessboard.
func CountOccupied(cb Chessboard) int {
	count := 0
	for _, file := range cb {
		for _, occupied := range file {
			if occupied {
				count++
			}
		}
	}
	return count
}