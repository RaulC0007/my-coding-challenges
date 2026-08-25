parse_card <- function(card) {
  switch(card,
    ace = 11,
    two = 2,
    three = 3,
    four = 4,
    five = 5,
    six = 6,
    seven = 7,
    eight = 8,
    nine = 9,
    ten = 10,
    jack = 10,
    queen = 10,
    king = 10,
    0  # default for other cards
  )
}

first_turn <- function(card1, card2, dealer_card) {
  # Get the values of all cards
  value1 <- parse_card(card1)
  value2 <- parse_card(card2)
  dealer_value <- parse_card(dealer_card)
  
  player_total <- value1 + value2
  
  # Check for pair of aces
  if (card1 == "ace" && card2 == "ace") {
    return("P")  # Split
  }
  
  # Check for Blackjack (total = 21)
  if (player_total == 21) {
    # If dealer has ace, figure (jack/queen/king), or ten, stand
    if (dealer_value >= 10 || dealer_card == "ace") {
      return("S")  # Stand
    } else {
      return("W")  # Automatically win
    }
  }
  
  # Score range [17, 20] - always stand
  if (player_total >= 17 && player_total <= 20) {
    return("S")
  }
  
  # Score range [12, 16] - stand unless dealer has 7 or higher
  if (player_total >= 12 && player_total <= 16) {
    if (dealer_value >= 7) {
      return("H")  # Hit
    } else {
      return("S")  # Stand
    }
  }
  
  # Score 11 or lower - always hit
  return("H")
}