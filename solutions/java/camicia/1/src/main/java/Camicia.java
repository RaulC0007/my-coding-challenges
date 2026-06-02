import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

public class Camicia {

    static CamiciaResult simulateGame(List<String> playerA, List<String> playerB) {
        List<String> deckA = new LinkedList<>(playerA);
        List<String> deckB = new LinkedList<>(playerB);
        List<String> pile = new ArrayList<>();
        
        int cardsPlayed = 0;
        int tricks = 0;
        int totalCards = playerA.size() + playerB.size();
        
        int currentPenalty = 0;
        String turn = "A";
        String lastPaymentPlayer = null;
        
        Set<String> seenStates = new HashSet<>();
        
        while (true) {
            // Check for loop at the start of a round (pile empty, no active penalty)
            if (pile.isEmpty() && currentPenalty == 0) {
                String state = canonicalize(deckA) + "|" + canonicalize(deckB) + "|" + turn;
                if (!seenStates.add(state)) {
                    return new CamiciaResult("loop", cardsPlayed, tricks);
                }
            }
            
            List<String> currentDeck = turn.equals("A") ? deckA : deckB;
            String otherPlayer = turn.equals("A") ? "B" : "A";
            
            // If a player runs out of cards, the other player collects the pile
            if (currentDeck.isEmpty()) {
                if (otherPlayer.equals("A")) {
                    deckA.addAll(pile);
                } else {
                    deckB.addAll(pile);
                }
                pile.clear();
                tricks++;
                turn = otherPlayer;
                lastPaymentPlayer = null;
                currentPenalty = 0;
                
                if (deckA.size() == totalCards || deckB.size() == totalCards) {
                    return new CamiciaResult("finished", cardsPlayed, tricks);
                }
                continue;
            }
            
            // Player plays a card
            String card = currentDeck.remove(0);
            pile.add(card);
            cardsPlayed++;
            
            if (currentPenalty > 0) {
                currentPenalty--;
                if (isPaymentCard(card)) {
                    // Penalty interrupted by a new payment card
                    lastPaymentPlayer = turn;
                    currentPenalty = getPenalty(card);
                    turn = otherPlayer;
                } else {
                    // Penalty continues to be paid
                    if (currentPenalty == 0) {
                        // Penalty fully paid! The player who placed the last payment card collects.
                        if (lastPaymentPlayer.equals("A")) {
                            deckA.addAll(pile);
                        } else {
                            deckB.addAll(pile);
                        }
                        pile.clear();
                        tricks++;
                        turn = lastPaymentPlayer; // Collector starts the next round
                        lastPaymentPlayer = null;
                        
                        if (deckA.size() == totalCards || deckB.size() == totalCards) {
                            return new CamiciaResult("finished", cardsPlayed, tricks);
                        }
                    }
                }
            } else {
                // Normal play, no active penalty
                if (isPaymentCard(card)) {
                    lastPaymentPlayer = turn;
                    currentPenalty = getPenalty(card);
                    turn = otherPlayer;
                } else {
                    turn = otherPlayer;
                }
            }
        }
    }
    
    private static boolean isPaymentCard(String card) {
        return card.equals("J") || card.equals("Q") || card.equals("K") || card.equals("A");
    }
    
    private static int getPenalty(String card) {
        if (card.equals("J")) return 1;
        if (card.equals("Q")) return 2;
        if (card.equals("K")) return 3;
        if (card.equals("A")) return 4;
        return 0;
    }
    
    private static String canonicalize(List<String> deck) {
        StringBuilder sb = new StringBuilder();
        for (String card : deck) {
            if (isPaymentCard(card)) {
                sb.append(card);
            } else {
                sb.append("N"); // Treat all number cards (2-10) as identical for loop detection
            }
        }
        return sb.toString();
    }
}