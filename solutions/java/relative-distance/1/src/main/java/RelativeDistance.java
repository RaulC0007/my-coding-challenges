import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;
import java.util.Queue;
import java.util.ArrayDeque;

class RelativeDistance {
    private final Map<String, Set<String>> graph;
    
    RelativeDistance(Map<String, List<String>> familyTree) {
        graph = new HashMap<>();
        
        for (Map.Entry<String, List<String>> entry : familyTree.entrySet()) {
            String parent = entry.getKey();
            List<String> children = entry.getValue();
            
            // Ensure parent exists in graph
            graph.putIfAbsent(parent, new HashSet<>());
            
            for (String child : children) {
                // Ensure child exists in graph
                graph.putIfAbsent(child, new HashSet<>());
                
                // Add parent-child bidirectional edge
                graph.get(parent).add(child);
                graph.get(child).add(parent);
            }
            
            // Add sibling connections (all pairs of children share an edge)
            for (int i = 0; i < children.size(); i++) {
                for (int j = i + 1; j < children.size(); j++) {
                    String s1 = children.get(i);
                    String s2 = children.get(j);
                    graph.get(s1).add(s2);
                    graph.get(s2).add(s1);
                }
            }
        }
    }

    int degreeOfSeparation(String personA, String personB) {
        // Same person = 0 degrees
        if (personA.equals(personB)) {
            return 0;
        }
        
        // Unknown person = no relationship
        if (!graph.containsKey(personA) || !graph.containsKey(personB)) {
            return -1;
        }
        
        // BFS for shortest path
        Queue<String> queue = new ArrayDeque<>();
        Map<String, Integer> distances = new HashMap<>();
        
        queue.offer(personA);
        distances.put(personA, 0);
        
        while (!queue.isEmpty()) {
            String current = queue.poll();
            int currentDist = distances.get(current);
            
            for (String neighbor : graph.get(current)) {
                if (neighbor.equals(personB)) {
                    return currentDist + 1;
                }
                if (!distances.containsKey(neighbor)) {
                    distances.put(neighbor, currentDist + 1);
                    queue.offer(neighbor);
                }
            }
        }
        
        // No path found
        return -1;
    }
}