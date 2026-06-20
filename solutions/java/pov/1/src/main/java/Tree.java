import java.util.*;

class Tree {
    private final String label;
    private final List<Tree> children;

    public Tree(String label) {
        this(label, new ArrayList<>());
    }

    public Tree(String label, List<Tree> children) {
        this.label = label;
        this.children = children;
    }

    public static Tree of(String label) {
        return new Tree(label);
    }

    public static Tree of(String label, List<Tree> children) {
        return new Tree(label, children);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Tree tree = (Tree) o;
        return label.equals(tree.label)
                && children.size() == tree.children.size()
                && children.containsAll(tree.children)
                && tree.children.containsAll(children);
    }

    @Override
    public int hashCode() {
        return Objects.hash(label, children);
    }

    @Override
    public String toString() {
        return "Tree{" + label +
                ", " + children +
                "}";
    }

    /**
     * Reorienta el árbol para que el nodo con la etiqueta 'fromNode' sea la nueva raíz.
     */
    public Tree fromPov(String fromNode) {
        List<Tree> path = new ArrayList<>();
        // Buscamos el camino desde la raíz original hasta el nodo objetivo
        if (!findPath(this, fromNode, path)) {
            throw new UnsupportedOperationException("Tree could not be reoriented");
        }
        // Reconstruimos el árbol desde el nodo objetivo hacia arriba
        return reorient(path, path.size() - 1);
    }

    /**
     * Encuentra el camino más corto entre dos nodos en el árbol.
     */
    public List<String> pathTo(String fromNode, String toNode) {
        // Verificamos si ambos nodos existen en el árbol
        if (!hasNode(fromNode) || !hasNode(toNode)) {
            throw new UnsupportedOperationException("No path found");
        }
        
        // Reorientamos el árbol desde 'fromNode' y buscamos 'toNode' en el nuevo árbol
        Tree reoriented = this.fromPov(fromNode);
        List<String> path = new ArrayList<>();
        findPathLabels(reoriented, toNode, path);
        return path;
    }

    // --- Métodos Auxiliares Privados ---

    private boolean hasNode(String target) {
        if (this.label.equals(target)) return true;
        for (Tree child : children) {
            if (child.hasNode(target)) return true;
        }
        return false;
    }

    private boolean findPath(Tree node, String target, List<Tree> path) {
        path.add(node);
        if (node.label.equals(target)) {
            return true;
        }
        for (Tree child : node.children) {
            if (findPath(child, target, path)) {
                return true;
            }
        }
        path.remove(path.size() - 1);
        return false;
    }

    private Tree reorient(List<Tree> path, int idx) {
        Tree node = path.get(idx);
        List<Tree> newChildren = new ArrayList<>();
        
        // Añadimos los hijos originales del nodo, excepto el que está en el camino hacia la nueva raíz
        String nextLabel = (idx + 1 < path.size()) ? path.get(idx + 1).label : null;
        for (Tree child : node.children) {
            if (!child.label.equals(nextLabel)) {
                newChildren.add(child);
            }
        }
        
        // El "padre" en el árbol original se convierte en un hijo en el nuevo árbol
        if (idx > 0) {
            newChildren.add(reorient(path, idx - 1));
        }
        
        return new Tree(node.label, newChildren);
    }

    private boolean findPathLabels(Tree node, String target, List<String> path) {
        path.add(node.label);
        if (node.label.equals(target)) {
            return true;
        }
        for (Tree child : node.children) {
            if (findPathLabels(child, target, path)) {
                return true;
            }
        }
        path.remove(path.size() - 1);
        return false;
    }
}