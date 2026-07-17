import java.util.*;

class TwoBucket {
    private final Result result;

    TwoBucket(int bucketOneCap, int bucketTwoCap, int desiredLiters, String startBucket) {
        // If the desired amount is larger than both buckets, it's impossible
        if (desiredLiters > bucketOneCap && desiredLiters > bucketTwoCap) {
            throw new UnreachableGoalException();
        }

        Queue<int[]> queue = new LinkedList<>();
        Set<String> visited = new HashSet<>();

        int b1 = 0, b2 = 0;
        
        // First action is always filling the starting bucket
        if (startBucket.equals("one")) {
            b1 = bucketOneCap;
        } else {
            b2 = bucketTwoCap;
        }
        
        queue.add(new int[]{b1, b2, 1});
        visited.add(b1 + "," + b2);
        
        // Rule: "you may not end up in a state after any action where the 
        // starting bucket is empty and the other bucket is full."
        String forbiddenState = startBucket.equals("one") ? "0," + bucketTwoCap : bucketOneCap + ",0";

        while (!queue.isEmpty()) {
            int[] curr = queue.poll();
            int c1 = curr[0];
            int c2 = curr[1];
            int moves = curr[2];

            // Check if we've reached the goal
            if (c1 == desiredLiters || c2 == desiredLiters) {
                String finalBucket = (c1 == desiredLiters) ? "one" : "two";
                int otherBucket = (c1 == desiredLiters) ? c2 : c1;
                this.result = new Result(moves, finalBucket, otherBucket);
                return;
            }

            // Generate all possible next states
            List<int[]> nextStates = new ArrayList<>();
            
            // 1. Fill bucket 1
            nextStates.add(new int[]{bucketOneCap, c2});
            // 2. Fill bucket 2
            nextStates.add(new int[]{c1, bucketTwoCap});
            // 3. Empty bucket 1
            nextStates.add(new int[]{0, c2});
            // 4. Empty bucket 2
            nextStates.add(new int[]{c1, 0});
            
            // 5. Pour bucket 1 into bucket 2
            int pour1to2 = Math.min(c1, bucketTwoCap - c2);
            nextStates.add(new int[]{c1 - pour1to2, c2 + pour1to2});
            
            // 6. Pour bucket 2 into bucket 1
            int pour2to1 = Math.min(c2, bucketOneCap - c1);
            nextStates.add(new int[]{c1 + pour2to1, c2 - pour2to1});

            // Process valid next states
            for (int[] next : nextStates) {
                String stateStr = next[0] + "," + next[1];
                // Avoid cycles and forbidden states
                if (!visited.contains(stateStr) && !stateStr.equals(forbiddenState)) {
                    visited.add(stateStr);
                    queue.add(new int[]{next[0], next[1], moves + 1});
                }
            }
        }

        // If the queue is exhausted and goal wasn't reached
        throw new UnreachableGoalException();
    }

    Result getResult() {
        return result;
    }
}