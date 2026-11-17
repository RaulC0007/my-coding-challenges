package genericset

// Set is a generic data structure that stores distinct, unique values.
// We use map[T]struct{} because struct{} takes up zero bytes of memory,
// making it the most memory-efficient way to implement a set in Go.
type Set[T comparable] map[T]struct{}

// NewSet creates and returns a new, empty Set.
func NewSet[T comparable]() Set[T] {
	return make(Set[T])
}

// Add inserts an element into the Set.
// If the element already exists, this is a no-op (which is correct for sets).
func (s Set[T]) Add(elem T) {
	s[elem] = struct{}{}
}

// Contains checks if an element exists in the Set.
func (s Set[T]) Contains(elem T) bool {
	_, ok := s[elem]
	return ok
}

// Equals checks if two Sets contain the exact same elements.
func (s Set[T]) Equals(other Set[T]) bool {
	// If the lengths are different, they cannot be equal
	if len(s) != len(other) {
		return false
	}

	// Check if every element in 's' is also in 'other'
	for elem := range s {
		if !other.Contains(elem) {
			return false
		}
	}

	return true
}
