import java.util.List;
import java.util.Set;
import java.util.HashSet;
import java.util.Collections;

class GottaSnatchEmAll {

    // Task 1: Convert a List of cards to a Set (removes duplicates)
    static Set<String> newCollection(List<String> cards) {
        return new HashSet<>(cards);
    }

    // Task 2: Add a card to the collection if not already present
    static boolean addCard(String card, Set<String> collection) {
        return collection.add(card);
    }

    // Task 3: Check if a trade is possible (both have something the other doesn't)
    static boolean canTrade(Set<String> myCollection, Set<String> theirCollection) {
        // Create copies to avoid modifying original sets
        Set<String> myUnique = new HashSet<>(myCollection);
        Set<String> theirUnique = new HashSet<>(theirCollection);
        
        // Remove common cards to find unique ones
        myUnique.removeAll(theirCollection);   // Cards I have that they don't
        theirUnique.removeAll(myCollection);   // Cards they have that I don't
        
        // Trade is possible if BOTH have at least one unique card
        return !myUnique.isEmpty() && !theirUnique.isEmpty();
    }

    // Task 4: Find cards common to ALL collections
    static Set<String> commonCards(List<Set<String>> collections) {
        if (collections.isEmpty()) {
            return Collections.emptySet();
        }
        
        // Start with a copy of the first collection
        Set<String> common = new HashSet<>(collections.get(0));
        
        // Retain only elements present in all subsequent collections
        for (int i = 1; i < collections.size(); i++) {
            common.retainAll(collections.get(i));
        }
        
        return common;
    }

    // Task 5: Combine all cards from all collections into one set
    static Set<String> allCards(List<Set<String>> collections) {
        Set<String> all = new HashSet<>();
        for (Set<String> collection : collections) {
            all.addAll(collection);
        }
        return all;
    }
}