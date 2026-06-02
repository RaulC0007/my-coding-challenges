import java.util.Stack;

class BracketChecker {
    private final String expression;
    
    BracketChecker(String expression) {
        this.expression = expression;
    }

    boolean areBracketsMatchedAndNestedCorrectly() {
        Stack<Character> stack = new Stack<>();
        
        for (char c : expression.toCharArray()) {
            if (isOpenBracket(c)) {
                stack.push(c);
            } else if (isCloseBracket(c)) {
                // Closing bracket with no matching opener → unbalanced
                if (stack.isEmpty()) {
                    return false;
                }
                char opener = stack.pop();
                // Mismatched bracket types → unbalanced
                if (!matches(opener, c)) {
                    return false;
                }
            }
            // Ignore all other characters (letters, numbers, spaces, etc.)
        }
        
        // All opened brackets must be closed (stack should be empty)
        return stack.isEmpty();
    }
    
    private boolean isOpenBracket(char c) {
        return c == '(' || c == '[' || c == '{';
    }
    
    private boolean isCloseBracket(char c) {
        return c == ')' || c == ']' || c == '}';
    }
    
    private boolean matches(char opener, char closer) {
        return (opener == '(' && closer == ')') ||
               (opener == '[' && closer == ']') ||
               (opener == '{' && closer == '}');
    }
}