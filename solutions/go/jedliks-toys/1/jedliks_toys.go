package jedlik

import "fmt"

// Drive updates the car's distance and battery when driving.
// If there is not enough battery to drive, the car will not move.
func (c *Car) Drive() {
	// Check if there's enough battery to drive
	if c.battery >= c.batteryDrain {
		c.distance += c.speed
		c.battery -= c.batteryDrain
	}
}

// DisplayDistance returns the distance driven as a string.
func (c Car) DisplayDistance() string {
	return fmt.Sprintf("Driven %d meters", c.distance)
}

// DisplayBattery returns the remaining battery percentage as a string.
func (c Car) DisplayBattery() string {
	return fmt.Sprintf("Battery at %d%%", c.battery)
}

// CanFinish checks if the car can finish a race of the given track distance.
func (c Car) CanFinish(trackDistance int) bool {
	// Calculate how many times the car can drive before battery is drained
	maxDrives := c.battery / c.batteryDrain
	
	// Calculate the maximum distance the car can cover
	maxDistance := maxDrives * c.speed
	
	// Check if the car can cover the track distance
	return maxDistance >= trackDistance
}