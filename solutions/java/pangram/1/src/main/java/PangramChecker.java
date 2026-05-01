public class PangramChecker {

    public boolean isPangram(String input) {
        boolean[] seen = new boolean[26];
        int uniqueLetters = 0;
        
        for (int i = 0; i < input.length(); i++) {
            char c = Character.toLowerCase(input.charAt(i));
            if (c >= 'a' && c <= 'z') {
                int index = c - 'a';
                if (!seen[index]) {
                    seen[index] = true;
                    uniqueLetters++;
                }
            }
        }
        
        return uniqueLetters == 26;
    }

}