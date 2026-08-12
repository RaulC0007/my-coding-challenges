package blackjack

// ParseCard returns the integer value of a card following blackjack ruleset.
func ParseCard(card string) int {
	switch card {
	case "ace":
		return 11
	case "two":
		return 2
	case "three":
		return 3
	case "four":
		return 4
	case "five":
		return 5
	case "six":
		return 6
	case "seven":
		return 7
	case "eight":
		return 8
	case "nine":
		return 9
	case "ten", "jack", "queen", "king":
		return 10
	default:
		return 0
	}
}

// FirstTurn returns the decision for the first turn, given two cards of the
// player and one card of the dealer.
func FirstTurn(card1, card2, dealerCard string) string {
	playerScore := ParseCard(card1) + ParseCard(card2)
	dealerValue := ParseCard(dealerCard)
	
	// Check for pair of aces
	if card1 == "ace" && card2 == "ace" {
		return "P"
	}
	
	// Check for Blackjack (score 21)
	if playerScore == 21 {
		// Dealer has ace, face card (jack/queen/king), or ten
		if dealerValue == 11 || dealerValue == 10 {
			return "S" // Stand
		}
		return "W" // Automatically win
	}
	
	// Score range [17, 20] - always stand
	if playerScore >= 17 && playerScore <= 20 {
		return "S"
	}
	
	// Score range [12, 16] - stand unless dealer has 7 or higher
	if playerScore >= 12 && playerScore <= 16 {
		if dealerValue >= 7 {
			return "H" // Hit
		}
		return "S" // Stand
	}
	
	// Score 11 or lower - always hit
	return "H"
}