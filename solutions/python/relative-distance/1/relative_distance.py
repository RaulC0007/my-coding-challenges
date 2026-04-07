"""Module for calculating degrees of separation in a family tree."""

from collections import deque


class RelativeDistance:
    """Calculate the degree of separation between individuals in a family tree."""
    
    def __init__(self, family_tree):
        """
        Initialize the RelativeDistance calculator.
        
        Args:
            family_tree: Dictionary where keys are parents and values are lists of children
        """
        self.family_tree = family_tree
        # Build a bidirectional graph for easier traversal
        self.connections = {}
        
        # Add parent -> child connections
        for parent, children in family_tree.items():
            if parent not in self.connections:
                self.connections[parent] = set()
            for child in children:
                self.connections[parent].add(child)
                # Add child -> parent connection
                if child not in self.connections:
                    self.connections[child] = set()
                self.connections[child].add(parent)
        
        # Add sibling connections (children of same parent)
        for parent, children in family_tree.items():
            for i, child1 in enumerate(children):
                for child2 in children[i+1:]:
                    self.connections[child1].add(child2)
                    self.connections[child2].add(child1)
    
    def degree_of_separation(self, person_a, person_b):
        """
        Calculate the degree of separation between two people.
        
        Args:
            person_a: First person
            person_b: Second person
            
        Returns:
            Integer representing the degree of separation
            
        Raises:
            ValueError: If either person is not in the family tree or no connection exists
        """
        # Check if both people exist in the family tree
        if person_a not in self.connections:
            raise ValueError('Person A not in family tree.')
        if person_b not in self.connections:
            raise ValueError('Person B not in family tree.')
        
        # Handle case where they're the same person
        if person_a == person_b:
            return 0
        
        # BFS to find shortest path
        queue = deque([(person_a, 0)])
        visited = {person_a}
        
        while queue:
            current_person, distance = queue.popleft()
            
            # Check all connections of current person
            for neighbor in self.connections.get(current_person, set()):
                if neighbor == person_b:
                    return distance + 1
                
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append((neighbor, distance + 1))
        
        # No connection found
        raise ValueError('No connection between person A and person B.')