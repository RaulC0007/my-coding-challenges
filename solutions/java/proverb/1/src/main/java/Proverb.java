class Proverb {
    private final String[] words;
    
    Proverb(String[] words) {
        this.words = words;
    }

    String recite() {
        // Handle empty input
        if (words == null || words.length == 0) {
            return "";
        }
        
        StringBuilder result = new StringBuilder();
        
        // Generate "For want of..." lines for consecutive pairs
        for (int i = 0; i < words.length - 1; i++) {
            result.append("For want of a ")
                  .append(words[i])
                  .append(" the ")
                  .append(words[i + 1])
                  .append(" was lost.\n");
        }
        
        // Add the final concluding line
        result.append("And all for the want of a ")
              .append(words[0])
              .append(".");
        
        return result.toString();
    }
}