// Package weather provides tools to forecast and track current weather conditions
// for various cities in Goblinocus. It allows storing and retrieving the current
// weather condition and location.
package weather

// CurrentCondition stores the current weather condition (e.g., "sunny", "rainy", "cloudy")
// for the most recently queried or updated location.
var CurrentCondition string

// CurrentLocation stores the name of the city or location for which the
// current weather condition is being tracked.
var CurrentLocation string

// Forecast updates the global CurrentLocation and CurrentCondition variables
// with the provided city and condition, and returns a formatted string describing
// the current weather condition at that location.
func Forecast(city, condition string) string {
	CurrentLocation, CurrentCondition = city, condition
	return CurrentLocation + " - current weather condition: " + CurrentCondition
}