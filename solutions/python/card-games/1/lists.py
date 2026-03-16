def get_rounds(round_number):
    """Return a list containing the current round and the next two."""
    return [round_number, round_number + 1, round_number + 2]

def concatenate_rounds(rounds_1, rounds_2):
    """Combine two lists of rounds into a single list."""
    return rounds_1 + rounds_2

def list_contains_round(rounds, round_number):
    """Check if a round exists in the list of rounds."""
    return round_number in rounds

def card_average(hand):
    """Calculate the average value of cards in a hand."""
    return sum(hand) / len(hand)

def approx_average_is_average(hand):
    """Check if either first/last average or median equals the true average."""
    actual_avg = card_average(hand)
    first_last_avg = (hand[0] + hand[-1]) / 2
    median = hand[len(hand) // 2]
    return actual_avg in (first_last_avg, median)

def average_even_is_average_odd(hand):
    """Check if average of even-indexed cards equals odd-indexed cards."""
    even_cards = hand[::2]
    odd_cards = hand[1::2]
    return sum(even_cards)/len(even_cards) == sum(odd_cards)/len(odd_cards)

def maybe_double_last(hand):
    """Double the last card if it's a Jack (11)."""
    if hand[-1] == 11:
        hand[-1] *= 2
    return hand
