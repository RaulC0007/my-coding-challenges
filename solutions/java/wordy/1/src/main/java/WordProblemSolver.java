public class WordProblemSolver {
    int solve(final String wordProblem) {
        // 1. Validate the basic structure of the question
        if (wordProblem == null || !wordProblem.startsWith("What is ") || !wordProblem.endsWith("?")) {
            throw new IllegalArgumentException("I'm sorry, I don't understand the question!");
        }
        
        // 2. Extract the content between "What is " and "?"
        String content = wordProblem.substring(8, wordProblem.length() - 1).trim();
        if (content.isEmpty()) {
            throw new IllegalArgumentException("I'm sorry, I don't understand the question!");
        }
        
        // 3. Split the content into tokens by spaces
        String[] tokens = content.split(" ");
        
        // 4. The first token must be a valid integer
        int result;
        try {
            result = Integer.parseInt(tokens[0]);
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("I'm sorry, I don't understand the question!");
        }
        
        // 5. Process the remaining tokens sequentially
        int i = 1;
        while (i < tokens.length) {
            String op = tokens[i];
            
            if (op.equals("plus")) {
                if (i + 1 >= tokens.length) throw new IllegalArgumentException("I'm sorry, I don't understand the question!");
                try {
                    result += Integer.parseInt(tokens[i + 1]);
                } catch (NumberFormatException e) {
                    throw new IllegalArgumentException("I'm sorry, I don't understand the question!");
                }
                i += 2;
            } 
            else if (op.equals("minus")) {
                if (i + 1 >= tokens.length) throw new IllegalArgumentException("I'm sorry, I don't understand the question!");
                try {
                    result -= Integer.parseInt(tokens[i + 1]);
                } catch (NumberFormatException e) {
                    throw new IllegalArgumentException("I'm sorry, I don't understand the question!");
                }
                i += 2;
            } 
            else if (op.equals("multiplied")) {
                if (i + 2 >= tokens.length || !tokens[i + 1].equals("by")) {
                    throw new IllegalArgumentException("I'm sorry, I don't understand the question!");
                }
                try {
                    result *= Integer.parseInt(tokens[i + 2]);
                } catch (NumberFormatException e) {
                    throw new IllegalArgumentException("I'm sorry, I don't understand the question!");
                }
                i += 3;
            } 
            else if (op.equals("divided")) {
                if (i + 2 >= tokens.length || !tokens[i + 1].equals("by")) {
                    throw new IllegalArgumentException("I'm sorry, I don't understand the question!");
                }
                try {
                    result /= Integer.parseInt(tokens[i + 2]);
                } catch (NumberFormatException e) {
                    throw new IllegalArgumentException("I'm sorry, I don't understand the question!");
                }
                i += 3;
            } 
            else {
                // Rejects unsupported operations (e.g., "cubed") or invalid syntax (e.g., "plus plus")
                throw new IllegalArgumentException("I'm sorry, I don't understand the question!");
            }
        }
        
        return result;
    }
}