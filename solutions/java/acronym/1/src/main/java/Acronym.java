class Acronym {
    private final String acronym;

    Acronym(String phrase) {
        // 1. Remove all punctuation except letters, spaces, and hyphens
        String cleaned = phrase.replaceAll("[^a-zA-Z\\s-]", "");
        // 2. Treat hyphens as word separators (replace with space)
        String spaced = cleaned.replace('-', ' ');
        // 3. Split by one or more whitespace characters
        String[] words = spaced.trim().split("\\s+");

        StringBuilder sb = new StringBuilder();
        for (String word : words) {
            if (!word.isEmpty()) {
                // Take the first character of each word and uppercase it
                sb.append(Character.toUpperCase(word.charAt(0)));
            }
        }
        this.acronym = sb.toString();
    }

    String get() {
        return acronym;
    }
}