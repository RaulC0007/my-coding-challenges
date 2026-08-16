package speed

// Car defines a remote controlled car with its specifications and state.
type Car struct {
	battery      int
	batteryDrain int
	speed        int
	distance     int
}

// NewCar creates a new remote controlled car with full battery and given specifications.
func NewCar(speed, batteryDrain int) Car {
	return Car{
		speed:        speed,
		batteryDrain: batteryDrain,
		battery:      100,
		distance:     0,
	}
}

// Track defines a race track with its distance.
type Track struct {
	distance int
}

// NewTrack creates a new track.
func NewTrack(distance int) Track {
	return Track{
		distance: distance,
	}
}

// Drive drives the car one time. If there is not enough battery to drive one more time,
// the car will not move.
func Drive(car Car) Car {
	// Check if there's enough battery to drive
	if car.battery >= car.batteryDrain {
		car.distance += car.speed
		car.battery -= car.batteryDrain
	}
	return car
}

// CanFinish checks if a car is able to finish a certain track.
func CanFinish(car Car, track Track) bool {
	// Calculate how many times the car can drive before battery is drained
	maxDrives := car.battery / car.batteryDrain
	
	// Calculate the maximum distance the car can cover
	maxDistance := maxDrives * car.speed
	
	// Check if the car can cover the track distance
	return maxDistance >= track.distance
}