package thefarm

import "fmt"

// DivideFood calculates the amount of food per cow.
// It returns the amount of food per cow as a float64 or an error if one occurred.
func DivideFood(fc FodderCalculator, cows int) (float64, error) {
	// Get the total fodder amount
	totalFodder, err := fc.FodderAmount(cows)
	if err != nil {
		return 0, err
	}
	
	// Get the fattening factor
	factor, err := fc.FatteningFactor()
	if err != nil {
		return 0, err
	}
	
	// Calculate and return the amount per cow
	return totalFodder * factor / float64(cows), nil
}

// ValidateInputAndDivideFood validates the number of cows and calls DivideFood.
// If the number of cows is greater than 0, it calls DivideFood and returns the results.
// If the number of cows is 0 or less, it returns an error with message "invalid number of cows".
func ValidateInputAndDivideFood(fc FodderCalculator, cows int) (float64, error) {
	if cows <= 0 {
		return 0, fmt.Errorf("invalid number of cows")
	}
	return DivideFood(fc, cows)
}

// InvalidCowsError is a custom error type for invalid cow numbers.
type InvalidCowsError struct {
	cows   int
	message string
}

// Error implements the error interface for InvalidCowsError.
func (e *InvalidCowsError) Error() string {
	return fmt.Sprintf("%d cows are invalid: %s", e.cows, e.message)
}

// ValidateNumberOfCows validates the number of cows and returns an appropriate error.
// If the number of cows is less than 0, it returns an InvalidCowsError with message "there are no negative cows".
// If the number of cows is 0, it returns an InvalidCowsError with message "no cows don't need food".
// Otherwise, it returns nil.
func ValidateNumberOfCows(cows int) error {
	if cows < 0 {
		return &InvalidCowsError{
			cows:   cows,
			message: "there are no negative cows",
		}
	}
	if cows == 0 {
		return &InvalidCowsError{
			cows:   cows,
			message: "no cows don't need food",
		}
	}
	return nil
}