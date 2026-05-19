export function degreesOfSeparation(
  familyTree: Record<string, string[]>,
  personA: string,
  personB: string
): number | null {
  // If the persons are the same, degree of separation is 0
  if (personA === personB) {
    return 0;
  }
  
  // Build adjacency list from the family tree
  const adjacencyList: Map<string, Set<string>> = new Map();
  
  // Add all parent-child relationships
  for (const [parent, children] of Object.entries(familyTree)) {
    for (const child of children) {
      // Add parent-child connection (bidirectional)
      if (!adjacencyList.has(parent)) {
        adjacencyList.set(parent, new Set());
      }
      adjacencyList.get(parent)!.add(child);
      
      if (!adjacencyList.has(child)) {
        adjacencyList.set(child, new Set());
      }
      adjacencyList.get(child)!.add(parent);
      
      // Add sibling connections: connect all children of the same parent to each other
      for (const sibling of children) {
        if (sibling !== child) {
          if (!adjacencyList.has(child)) {
            adjacencyList.set(child, new Set());
          }
          adjacencyList.get(child)!.add(sibling);
          
          if (!adjacencyList.has(sibling)) {
            adjacencyList.set(sibling, new Set());
          }
          adjacencyList.get(sibling)!.add(child);
        }
      }
    }
  }
  
  // Check if both persons exist in the tree
  // Check if persons exist in the tree
  const allPeople = new Set(adjacencyList.keys());
  if (!allPeople.has(personA) || !allPeople.has(personB)) {
    return -1; // No known relationship - return -1 as expected by tests
  }
  
  // BFS to find shortest path between personA and personB
  const queue: [string, number][] = [[personA, 0]];
  const visited: Set<string> = new Set([personA]);
  
  while (queue.length > 0) {
    const [currentPerson, distance] = queue.shift()!;
    
    // Get neighbors of current person
    const neighbors = adjacencyList.get(currentPerson) || new Set();
    
    for (const neighbor of neighbors) {
      if (neighbor === personB) {
        return distance + 1;
      }
      
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, distance + 1]);
      }
    }
  }
  
  // No path found
  return -1;
}