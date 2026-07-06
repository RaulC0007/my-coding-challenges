class FoodChain {
    private static final String[] ANIMALS = {
        "fly", "spider", "bird", "cat", "dog", "goat", "cow", "horse"
    };

    private static final String[] REACTIONS = {
        "",
        "It wriggled and jiggled and tickled inside her.",
        "How absurd to swallow a bird!",
        "Imagine that, to swallow a cat!",
        "What a hog, to swallow a dog!",
        "Just opened her throat and swallowed a goat!",
        "I don't know how she swallowed a cow!",
        "She's dead, of course!"
    };

    String verse(int verse) {
        int idx = verse - 1;
        StringBuilder sb = new StringBuilder();
        
        // First line
        sb.append("I know an old lady who swallowed a ").append(ANIMALS[idx]).append(".");
        
        // The horse is a special case
        if (idx == 7) {
            sb.append("\n").append(REACTIONS[idx]);
            return sb.toString();
        }
        
        // Add the unique reaction line for verses 2-7
        if (idx > 0) {
            sb.append("\n").append(REACTIONS[idx]);
        }
        
        // Build the cumulative "swallowed to catch" chain backwards
        for (int i = idx; i > 0; i--) {
            sb.append("\nShe swallowed the ").append(ANIMALS[i])
              .append(" to catch the ").append(ANIMALS[i - 1]);
            
            // The spider has a special extension when it's the one being caught
            if (i - 1 == 1) {
                sb.append(" that wriggled and jiggled and tickled inside her");
            }
            sb.append(".");
        }
        
        // The final line for all non-horse verses
        sb.append("\nI don't know why she swallowed the fly. Perhaps she'll die.");
        return sb.toString();
    }

    String verses(int startVerse, int endVerse) {
        StringBuilder sb = new StringBuilder();
        for (int i = startVerse; i <= endVerse; i++) {
            sb.append(verse(i));
            // Add a blank line between verses, but not after the final verse
            if (i < endVerse) {
                sb.append("\n\n");
            }
        }
        return sb.toString();
    }
}