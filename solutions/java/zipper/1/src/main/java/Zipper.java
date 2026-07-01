class Zipper {
    private int value;
    Zipper up;
    Zipper left;
    Zipper right;

    Zipper(int val) {
        this.value = val;
    }

    BinaryTree toTree() {
        Zipper current = this;
        // Traverse up until we find the root node (where up is null)
        while (current.up != null) {
            current = current.up;
        }
        return new BinaryTree(current);
    }

    int getValue() {
        return value;
    }

    Zipper setLeft(Zipper leftChild) {
        this.left = leftChild;
        if (leftChild != null) {
            leftChild.up = this;
        }
        return this;
    }

    Zipper setRight(Zipper rightChild) {
        this.right = rightChild;
        if (rightChild != null) {
            rightChild.up = this;
        }
        return this;
    }

    void setValue(int val) {
        this.value = val;
    }
}

class BinaryTree {
    private Zipper root;

    BinaryTree(int value) {
        this.root = new Zipper(value);
    }

    BinaryTree(Zipper root) {
        this.root = root;
    }

    Zipper getRoot() {
        return root;
    }

    String printTree() {
        if (root == null) return "null";
        // The root node does not have braces around it
        return "value: " + root.getValue() + 
               ", left: " + printNode(root.left) + 
               ", right: " + printNode(root.right);
    }

    private String printNode(Zipper node) {
        if (node == null) {
            return "null";
        }
        // Child nodes are wrapped in "{ ... }"
        return "{ value: " + node.getValue() + 
               ", left: " + printNode(node.left) + 
               ", right: " + printNode(node.right) + " }";
    }

    // 🔧 FIX 1: Override equals() to compare the actual structure of the trees
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BinaryTree that = (BinaryTree) o;
        // Since printTree() generates a unique string for each tree structure, 
        // we can use it to easily and correctly compare two trees.
        return this.printTree().equals(that.printTree());
    }

    @Override
    public int hashCode() {
        return printTree() != null ? printTree().hashCode() : 0;
    }
}