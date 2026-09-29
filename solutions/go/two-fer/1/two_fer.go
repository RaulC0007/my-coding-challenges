package twofer

import "fmt"

// ShareWith returns a string sharing a cookie with the given name, or "you" if the name is empty.
func ShareWith(name string) string {
	if name == "" {
		name = "you"
	}
	return fmt.Sprintf("One for %s, one for me.", name)
}