package clock

import "fmt"

// Clock represents a time of day without a date.
// We store the time internally as total minutes since midnight (0 to 1439).
// This ensures that two clocks representing the same time will always have 
// the same internal value, making the == operator work perfectly.
type Clock struct {
	minutes int
}

// New creates a new Clock, normalizing the hours and minutes.
func New(h, m int) Clock {
	total := h*60 + m
	
	// Normalize to be within the range [0, 1439]
	total %= 1440
	if total < 0 {
		total += 1440
	}
	
	return Clock{minutes: total}
}

// Add returns a new Clock with the specified minutes added.
func (c Clock) Add(m int) Clock {
	return New(0, c.minutes+m)
}

// Subtract returns a new Clock with the specified minutes subtracted.
func (c Clock) Subtract(m int) Clock {
	return New(0, c.minutes-m)
}

// String returns the clock's time formatted as "HH:MM".
func (c Clock) String() string {
	return fmt.Sprintf("%02d:%02d", c.minutes/60, c.minutes%60)
}