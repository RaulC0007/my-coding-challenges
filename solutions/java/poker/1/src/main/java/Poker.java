import java.util.*;

class Poker {
    private final List<Hand> hands;

    Poker(List<String> hand) {
        this.hands = new ArrayList<>();
        for (String h : hand) {
            this.hands.add(new Hand(h));
        }
    }

    List<String> getBestHands() {
        Hand maxHand = Collections.max(hands);
        List<String> bestHands = new ArrayList<>();
        for (Hand h : hands) {
            if (h.compareTo(maxHand) == 0) {
                bestHands.add(h.original);
            }
        }
        return bestHands;
    }

    private static class Hand implements Comparable<Hand> {
        String original;
        List<Integer> score;

        Hand(String handStr) {
            original = handStr;
            score = calculateScore(handStr);
        }

        private List<Integer> calculateScore(String handStr) {
            String[] cards = handStr.split(" ");
            List<Integer> ranks = new ArrayList<>();
            List<Character> suits = new ArrayList<>();

            for (String card : cards) {
                String rankStr = card.substring(0, card.length() - 1);
                char suit = card.charAt(card.length() - 1);

                int rank;
                if (rankStr.equals("J")) rank = 11;
                else if (rankStr.equals("Q")) rank = 12;
                else if (rankStr.equals("K")) rank = 13;
                else if (rankStr.equals("A")) rank = 14;
                else rank = Integer.parseInt(rankStr);

                ranks.add(rank);
                suits.add(suit);
            }

            Collections.sort(ranks, Collections.reverseOrder());

            Map<Integer, Integer> rankCounts = new HashMap<>();
            for (int r : ranks) {
                rankCounts.put(r, rankCounts.getOrDefault(r, 0) + 1);
            }

            Map<Character, Integer> suitCounts = new HashMap<>();
            for (char s : suits) {
                suitCounts.put(s, suitCounts.getOrDefault(s, 0) + 1);
            }

            boolean isFlush = suitCounts.size() == 1;

            boolean isStraight = false;
            int straightHigh = 0;

            // Normal straight
            if (ranks.get(0) - ranks.get(4) == 4 && new HashSet<>(ranks).size() == 5) {
                isStraight = true;
                straightHigh = ranks.get(0);
            } 
            // Low ace straight (A, 5, 4, 3, 2)
            else if (ranks.get(0) == 14 && ranks.get(1) == 5 && ranks.get(2) == 4 && ranks.get(3) == 3 && ranks.get(4) == 2) {
                isStraight = true;
                straightHigh = 5;
            }

            // Group ranks by frequency, then by rank descending
            List<Map.Entry<Integer, Integer>> entries = new ArrayList<>(rankCounts.entrySet());
            entries.sort((a, b) -> {
                if (!a.getValue().equals(b.getValue())) {
                    return b.getValue().compareTo(a.getValue());
                }
                return b.getKey().compareTo(a.getKey());
            });

            List<Integer> score = new ArrayList<>();

            if (isStraight && isFlush) {
                score.add(9);
                score.add(straightHigh);
            } else if (entries.get(0).getValue() == 4) {
                score.add(8);
                score.add(entries.get(0).getKey());
                score.add(entries.get(1).getKey());
            } else if (entries.get(0).getValue() == 3 && entries.get(1).getValue() == 2) {
                score.add(7);
                score.add(entries.get(0).getKey());
                score.add(entries.get(1).getKey());
            } else if (isFlush) {
                score.add(6);
                score.addAll(ranks);
            } else if (isStraight) {
                score.add(5);
                score.add(straightHigh);
            } else if (entries.get(0).getValue() == 3) {
                score.add(4);
                score.add(entries.get(0).getKey());
                score.add(entries.get(1).getKey());
                score.add(entries.get(2).getKey());
            } else if (entries.get(0).getValue() == 2 && entries.get(1).getValue() == 2) {
                score.add(3);
                score.add(entries.get(0).getKey());
                score.add(entries.get(1).getKey());
                score.add(entries.get(2).getKey());
            } else if (entries.get(0).getValue() == 2) {
                score.add(2);
                score.add(entries.get(0).getKey());
                score.add(entries.get(1).getKey());
                score.add(entries.get(2).getKey());
                score.add(entries.get(3).getKey());
            } else {
                score.add(1);
                score.addAll(ranks);
            }

            return score;
        }

        @Override
        public int compareTo(Hand other) {
            for (int i = 0; i < this.score.size(); i++) {
                int cmp = this.score.get(i).compareTo(other.score.get(i));
                if (cmp != 0) return cmp;
            }
            return 0;
        }
    }
}