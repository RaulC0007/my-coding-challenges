import java.util.List;
import java.util.ArrayList;

class Dominoes {

    List<Domino> formChain(List<Domino> inputDominoes) throws ChainNotFoundException {
        // An empty set of dominoes forms a valid (empty) chain
        if (inputDominoes.isEmpty()) {
            return new ArrayList<>();
        }
        
        boolean[] used = new boolean[inputDominoes.size()];
        List<Domino> chain = new ArrayList<>();
        
        // Optimization: Since the chain must form a closed loop, we can arbitrarily 
        // fix the first domino to be the first one in the input list (in its original orientation).
        // Any valid loop can be rotated and/or reversed to start with this specific domino.
        Domino first = inputDominoes.get(0);
        used[0] = true;
        chain.add(first);
        
        if (backtrack(inputDominoes, used, chain)) {
            return chain;
        }
        
        // 🔧 FIX: Changed the message to exactly match the test expectations
        throw new ChainNotFoundException("No domino chain found.");
    }
    
    private boolean backtrack(List<Domino> input, boolean[] used, List<Domino> chain) {
        // If we've placed all dominoes, check if the chain forms a closed loop
        if (chain.size() == input.size()) {
            return chain.get(0).getLeft() == chain.get(chain.size() - 1).getRight();
        }
        
        // The next domino must match the right side of the last placed domino
        int nextRequired = chain.get(chain.size() - 1).getRight();
        
        for (int i = 1; i < input.size(); i++) {
            if (!used[i]) {
                Domino d = input.get(i);
                
                // Try placing the domino in its original orientation
                if (d.getLeft() == nextRequired) {
                    used[i] = true;
                    chain.add(new Domino(d.getLeft(), d.getRight()));
                    if (backtrack(input, used, chain)) return true;
                    chain.remove(chain.size() - 1); // Backtrack
                    used[i] = false;
                }
                
                // Try placing the domino flipped (only if it's not a double)
                if (d.getLeft() != d.getRight() && d.getRight() == nextRequired) {
                    used[i] = true;
                    chain.add(new Domino(d.getRight(), d.getLeft()));
                    if (backtrack(input, used, chain)) return true;
                    chain.remove(chain.size() - 1); // Backtrack
                    used[i] = false;
                }
            }
        }
        return false;
    }
}