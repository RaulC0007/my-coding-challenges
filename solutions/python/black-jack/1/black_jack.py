def value_of_card(card):
    """Return the numerical value of a card (Ace as 1)."""
    if card in ('J', 'Q', 'K'):
        return 10
    elif card == 'A':
        return 1
    else:
        return int(card)

def higher_card(card_one, card_two):
    """Return the higher value card, or both if equal."""
    val1 = value_of_card(card_one)
    val2 = value_of_card(card_two)
    return (card_one, card_two) if val1 == val2 else (card_one if val1 > val2 else card_two)

def value_of_ace(card_one, card_two):
    """
    Determine optimal Ace value (1 or 11) without busting.
    Special cases:
    - If hand already contains an Ace, new Ace must be 1
    - If hand contains two 10-value cards, Ace must be 1
    """
    # Check if either card is already an Ace
    if card_one == 'A' or card_two == 'A':
        return 1
    
    # Calculate current hand value (Aces as 1)
    current_value = value_of_card(card_one) + value_of_card(card_two)
    
    # Special case: two 10-value cards
    if value_of_card(card_one) == 10 and value_of_card(card_two) == 10:
        return 1
    
    # Normal case: decide between 11 and 1
    return 11 if (current_value + 11) <= 21 else 1

def is_blackjack(card_one, card_two):
    """Check if hand is a natural Blackjack (Ace + 10-value card)."""
    return (card_one == 'A' and card_two in ('10', 'J', 'Q', 'K')) or \
           (card_two == 'A' and card_one in ('10', 'J', 'Q', 'K'))

def can_split_pairs(card_one, card_two):
    """Check if hand can be split (cards of equal value)."""
    return value_of_card(card_one) == value_of_card(card_two)

def can_double_down(card_one, card_two):
    """Check if hand qualifies for doubling down (total 9-11)."""
    total = value_of_card(card_one) + value_of_card(card_two)
    return 9 <= total <= 11

print(value_of_card('K'))  # 10
print(higher_card('A', 'K'))  # 'K'
print(value_of_ace('7', '3'))  # 11
print(is_blackjack('A', 'J'))  # True
print(can_split_pairs('Q', 'K'))  # True
print(can_double_down('A', '8'))  # False (total=9, but Ace is 1 here)
    

