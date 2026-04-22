class SqueakyClean {
    static String clean(String identifier) {
        StringBuilder result = new StringBuilder();
        boolean capitalizeNext = false;
        
        for (char ch : identifier.toCharArray()) {
            if (ch == ' ') {
                // Task 1: Replace spaces with underscores
                result.append('_');
                capitalizeNext = false;
            } else if (ch == '-') {
                // Task 2: Mark next letter for capitalization (kebab → camelCase)
                capitalizeNext = true;
            } else if (ch == '4' || ch == '3' || ch == '0' || ch == '1' || ch == '7') {
                // Task 3: Convert leetspeak digits to letters
                char converted;
                switch (ch) {
                    case '4': converted = 'a'; break;
                    case '3': converted = 'e'; break;
                    case '0': converted = 'o'; break;
                    case '1': converted = 'l'; break;
                    case '7': converted = 't'; break;
                    default: converted = ch; break;
                }
                if (capitalizeNext) {
                    converted = Character.toUpperCase(converted);
                    capitalizeNext = false;
                }
                result.append(converted);
            } else if (Character.isLetter(ch)) {
                // Task 4: Keep only letters (apply capitalization if needed)
                if (capitalizeNext) {
                    ch = Character.toUpperCase(ch);
                    capitalizeNext = false;
                }
                result.append(ch);
            }
            // All other characters are omitted (Task 4)
        }
        
        return result.toString();
    }
}