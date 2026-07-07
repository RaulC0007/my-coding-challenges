class House {
    private static final String[] SUBJECTS = {
        "house",
        "malt",
        "rat",
        "cat",
        "dog",
        "cow with the crumpled horn",
        "maiden all forlorn",
        "man all tattered and torn",
        "priest all shaven and shorn",
        "rooster that crowed in the morn",
        "farmer sowing his corn",
        "horse and the hound and the horn"
    };

    private static final String[] ACTIONS = {
        "",
        "lay in",
        "ate",
        "killed",
        "worried",
        "tossed",
        "milked",
        "kissed",
        "married",
        "woke",
        "kept",
        "belonged to"
    };

    String verse(int verse) {
        int idx = verse - 1;
        StringBuilder sb = new StringBuilder();
        
        // Start with the subject of the current verse
        sb.append("This is the ").append(SUBJECTS[idx]);
        
        // Build the cumulative chain backwards (using spaces, not newlines)
        for (int i = idx; i >= 1; i--) {
            sb.append(" that ").append(ACTIONS[i]).append(" the ").append(SUBJECTS[i - 1]);
        }
        
        // Every verse ends with the same final clause
        sb.append(" that Jack built.");
        return sb.toString();
    }

    String verses(int startVerse, int endVerse) {
        StringBuilder sb = new StringBuilder();
        for (int i = startVerse; i <= endVerse; i++) {
            sb.append(verse(i));
            // Add a single newline between verses, but not after the final verse
            if (i < endVerse) {
                sb.append("\n");
            }
        }
        return sb.toString();
    }

    String sing() {
        return verses(1, 12);
    }
}