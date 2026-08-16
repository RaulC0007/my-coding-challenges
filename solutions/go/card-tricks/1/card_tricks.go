package cards

// FavoriteCards returns a slice with the cards 2, 6 and 9 in that order.
func FavoriteCards() []int {
	return []int{2, 6, 9}
}

// GetItem retrieves an item from a slice at given position.
// If the index is out of range, we want it to return -1.
func GetItem(slice []int, index int) int {
	// Check if index is out of bounds
	if index < 0 || index >= len(slice) {
		return -1
	}
	return slice[index]
}

// SetItem writes an item to a slice at given position overwriting an existing value.
// If the index is out of range the value needs to be appended.
func SetItem(slice []int, index, value int) []int {
	// Check if index is out of bounds
	if index < 0 || index >= len(slice) {
		// Append the value to the end of the slice
		return append(slice, value)
	}
	// Replace the value at the given index
	slice[index] = value
	return slice
}

// PrependItems adds an arbitrary number of values at the front of a slice.
func PrependItems(slice []int, values ...int) []int {
	// If no values are provided, return the original slice
	if len(values) == 0 {
		return slice
	}
	// Prepend the values to the front of the slice
	return append(values, slice...)
}

// RemoveItem removes an item from a slice by modifying the existing slice.
func RemoveItem(slice []int, index int) []int {
	// Check if index is out of bounds
	if index < 0 || index >= len(slice) {
		return slice
	}
	// Remove the element at the given index by slicing
	return append(slice[:index], slice[index+1:]...)
}