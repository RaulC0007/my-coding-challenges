package lasagnamaster

// PreparationTime estimates the total preparation time based on the number of layers.
// If avgPrepTime is 0, the default value of 2 minutes per layer is used.
func PreparationTime(layers []string, avgPrepTime int) int {
	if avgPrepTime == 0 {
		avgPrepTime = 2
	}
	return len(layers) * avgPrepTime
}

// Quantities determines the quantity of noodles and sauce needed.
// Each noodle layer requires 50 grams of noodles.
// Each sauce layer requires 0.2 liters of sauce.
func Quantities(layers []string) (int, float64) {
	noodles := 0
	sauce := 0.0
	
	for _, layer := range layers {
		switch layer {
		case "noodles":
			noodles += 50
		case "sauce":
			sauce += 0.2
		}
	}
	
	return noodles, sauce
}

// AddSecretIngredient replaces the "?" in myList with the last item from friendsList.
// The friendsList is not modified, but myList is modified directly.
func AddSecretIngredient(friendsList, myList []string) {
	secretIngredient := friendsList[len(friendsList)-1]
	myList[len(myList)-1] = secretIngredient
}

// ScaleRecipe scales the amounts for a recipe from 2 portions to the desired number of portions.
// The original quantities slice is not modified.
func ScaleRecipe(quantities []float64, portions int) []float64 {
	scaled := make([]float64, len(quantities))
	scaleFactor := float64(portions) / 2.0
	
	for i, qty := range quantities {
		scaled[i] = qty * scaleFactor
	}
	
	return scaled
}