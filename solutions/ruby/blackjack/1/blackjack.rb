module Blackjack
  CARD_VALUES = {
    'ace'   => 11,
    'two'   => 2,
    'three' => 3,
    'four'  => 4,
    'five'  => 5,
    'six'   => 6,
    'seven' => 7,
    'eight' => 8,
    'nine'  => 9,
    'ten'   => 10,
    'jack'  => 10,
    'queen' => 10,
    'king'  => 10
  }.freeze

  def self.parse_card(card)
    CARD_VALUES[card] || 0
  end

  def self.card_range(card1, card2)
    total = parse_card(card1) + parse_card(card2)

    case total
    when 4..11   then 'low'
    when 12..16  then 'mid'
    when 17..20  then 'high'
    when 21      then 'blackjack'
    else              'low'   # fallback, though shouldn't happen with valid cards
    end
  end

  def self.first_turn(card1, card2, dealer_card)
    # Early exit for pair of aces — always split
    return 'P' if card1 == 'ace' && card2 == 'ace'

    player_total = parse_card(card1) + parse_card(card2)
    dealer_value = parse_card(dealer_card)

    case player_total
    when 21
      # Blackjack: win automatically unless dealer shows 10-value or ace
      dealer_shows_strong = dealer_value >= 10 || dealer_value == 11
      dealer_shows_strong ? 'S' : 'W'

    when 17..20
      'S'   # always stand

    when 12..16
      # Stand if dealer shows 2–6, hit if 7 or higher
      dealer_value >= 7 ? 'H' : 'S'

    else
      # 11 or lower → always hit
      'H'
    end
  end
end