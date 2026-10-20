package spaceage

type Planet string

func Age(seconds float64, planet Planet) float64 {
	earthSecondsPerYear := 31557600.0

	var orbitalPeriod float64

	switch planet {
	case "Mercury":
		orbitalPeriod = 0.2408467
	case "Venus":
		orbitalPeriod = 0.61519726
	case "Earth":
		orbitalPeriod = 1.0
	case "Mars":
		orbitalPeriod = 1.8808158
	case "Jupiter":
		orbitalPeriod = 11.862615
	case "Saturn":
		orbitalPeriod = 29.447498
	case "Uranus":
		orbitalPeriod = 84.016846
	case "Neptune":
		orbitalPeriod = 164.79132
	default:
		return -1.0
	}

	return seconds / (earthSecondsPerYear * orbitalPeriod)
}