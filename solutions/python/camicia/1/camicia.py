def simulate_game(player_a, player_b):
    deck_a = list(player_a)
    deck_b = list(player_b)
    pile = []
    total_cards = 0
    tricks = 0
    
    penalty_cards = {'J': 1, 'Q': 2, 'K': 3, 'A': 4}
    seen_states = set()

    def get_canonical_state(d_a, d_b):
        # Instructions: "not counting number cards!"
        # Replace 2-10 with 'N' to focus only on J, Q, K, A structure
        norm_a = tuple('N' if str(c).isdigit() else c for c in d_a)
        norm_b = tuple('N' if str(c).isdigit() else c for c in d_b)
        return (norm_a, norm_b)

    current_player = 'A'

    while True:
        # Loop detection: check at the start of a new round
        state = get_canonical_state(deck_a, deck_b)
        if state in seen_states:
            return {"status": "loop", "cards": total_cards, "tricks": tricks}
        seen_states.add(state)

        # Start of a round/turn
        penalty_active = False
        
        while True:
            active_deck = deck_a if current_player == 'A' else deck_b
            
            # If player can't play, opponent takes the pile immediately
            if not active_deck:
                opponent = 'B' if current_player == 'A' else 'A'
                if opponent == 'A':
                    deck_a.extend(pile)
                else:
                    deck_b.extend(pile)
                pile = []
                tricks += 1
                # Check for game end
                if not deck_a or not deck_b:
                    return {"status": "finished", "cards": total_cards, "tricks": tricks}
                current_player = opponent
                break # End round

            # Play card
            card = active_deck.pop(0)
            pile.append(card)
            total_cards += 1

            if card in penalty_cards:
                current_player = 'B' if current_player == 'A' else 'A'
                penalty_due = penalty_cards[card]
                penalty_active = True
                
                # Payment sub-loop
                while penalty_due > 0:
                    pay_deck = deck_a if current_player == 'A' else deck_b
                    
                    if not pay_deck:
                        # Payee ran out; the other player wins the trick
                        winner = 'B' if current_player == 'A' else 'A'
                        (deck_a if winner == 'A' else deck_b).extend(pile)
                        pile = []
                        tricks += 1
                        if not deck_a or not deck_b:
                            return {"status": "finished", "cards": total_cards, "tricks": tricks}
                        current_player = winner
                        # Break out of payment and round
                        break 
                    
                    p_card = pay_deck.pop(0)
                    pile.append(p_card)
                    total_cards += 1
                    
                    if p_card in penalty_cards:
                        # Penalty interrupted! Switch roles and reset penalty
                        current_player = 'B' if current_player == 'A' else 'A'
                        penalty_due = penalty_cards[p_card]
                    else:
                        penalty_due -= 1
                
                else: # Penalty fully paid without interruption
                    collector = 'B' if current_player == 'A' else 'A'
                    (deck_a if collector == 'A' else deck_b).extend(pile)
                    pile = []
                    tricks += 1
                    if not deck_a or not deck_b:
                        return {"status": "finished", "cards": total_cards, "tricks": tricks}
                    current_player = collector
                break # Trick completed, start next round

            else:
                # Number card played, no penalty active: switch turns
                current_player = 'B' if current_player == 'A' else 'A'
                # If we get back here, it's the start of a normal turn in same round
                continue