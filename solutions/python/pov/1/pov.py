from collections import defaultdict, deque
from json import dumps


class Tree:
    def __init__(self, label, children=None):
        self.label = label
        self.children = children if children is not None else []

    def __dict__(self):
        return {self.label: [c.__dict__() for c in sorted(self.children)]}

    def __str__(self, indent=None):
        return dumps(self.__dict__(), indent=indent)

    def __lt__(self, other):
        return self.label < other.label

    def __eq__(self, other):
        return self.__dict__() == other.__dict__()

    def _build_graph_and_nodes(self):
        """Builds an undirected graph representation and collects all nodes."""
        graph = defaultdict(set)
        all_nodes = set()

        def _traverse(node, parent_label):
            all_nodes.add(node.label)
            if parent_label is not None:
                graph[node.label].add(parent_label)
                graph[parent_label].add(node.label)
            for child in node.children:
                _traverse(child, node.label)

        _traverse(self, None)
        return graph, all_nodes

    def from_pov(self, from_node):
        graph, all_nodes = self._build_graph_and_nodes()

        if from_node not in all_nodes:
            raise ValueError("Tree could not be reoriented")

        # Reconstruct the tree rooted at 'from_node' using BFS/DFS
        visited = set()
        queue = deque([from_node])
        visited.add(from_node)

        # Dictionary to store the new parent of each node in the reoriented tree
        new_parents = {from_node: None}

        while queue:
            current = queue.popleft()
            for neighbor in graph[current]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    new_parents[neighbor] = current
                    queue.append(neighbor)

        # Build the new tree structure recursively from the parent map
        def build_subtree(label):
            children_labels = [child_label for child_label, parent_label in new_parents.items() if parent_label == label]
            child_trees = [build_subtree(child_label) for child_label in children_labels]
            return Tree(label, child_trees)

        return build_subtree(from_node)

    def path_to(self, from_node, to_node):
        graph, all_nodes = self._build_graph_and_nodes()

        if from_node not in all_nodes:
            raise ValueError("Tree could not be reoriented")
        if to_node not in all_nodes:
            raise ValueError("No path found")

        if from_node == to_node:
            return [from_node]

        # BFS to find the shortest path
        queue = deque([(from_node, [from_node])])
        visited = {from_node}

        while queue:
            current_node, path = queue.popleft()

            for neighbor in graph[current_node]:
                if neighbor == to_node:
                    return path + [neighbor]
                if neighbor not in visited:
                    visited.add(neighbor)
                    new_path = path + [neighbor]
                    queue.append((neighbor, new_path))

        raise ValueError("No path found")