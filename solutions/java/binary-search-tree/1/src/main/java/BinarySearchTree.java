import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

class BinarySearchTree<T extends Comparable<T>> {
    private Node<T> root;

    void insert(T value) {
        if (root == null) {
            root = new Node<>(value);
        } else {
            insertRecursive(root, value);
        }
    }

    private void insertRecursive(Node<T> node, T value) {
        // Values less than or equal go to the left
        if (value.compareTo(node.getData()) <= 0) {
            if (node.getLeft() == null) {
                node.setLeft(new Node<>(value));
            } else {
                insertRecursive(node.getLeft(), value);
            }
        } 
        // Values greater go to the right
        else {
            if (node.getRight() == null) {
                node.setRight(new Node<>(value));
            } else {
                insertRecursive(node.getRight(), value);
            }
        }
    }

    List<T> getAsSortedList() {
        List<T> sortedList = new ArrayList<>();
        if (root != null) {
            inOrderTraversal(root, sortedList);
        }
        return sortedList;
    }

    private void inOrderTraversal(Node<T> node, List<T> list) {
        if (node == null) return;
        
        // Left -> Root -> Right produces a sorted order in a BST
        inOrderTraversal(node.getLeft(), list);
        list.add(node.getData());
        inOrderTraversal(node.getRight(), list);
    }

    List<T> getAsLevelOrderList() {
        List<T> levelOrderList = new ArrayList<>();
        if (root == null) return levelOrderList;

        Queue<Node<T>> queue = new LinkedList<>();
        queue.add(root);

        while (!queue.isEmpty()) {
            Node<T> current = queue.poll();
            levelOrderList.add(current.getData());

            if (current.getLeft() != null) {
                queue.add(current.getLeft());
            }
            if (current.getRight() != null) {
                queue.add(current.getRight());
            }
        }

        return levelOrderList;
    }

    Node<T> getRoot() {
        return root;
    }

    static class Node<T> {
        private final T data;
        private Node<T> left;
        private Node<T> right;

        Node(T data) {
            this.data = data;
        }

        T getData() {
            return data;
        }

        Node<T> getLeft() {
            return left;
        }

        void setLeft(Node<T> left) {
            this.left = left;
        }

        Node<T> getRight() {
            return right;
        }

        void setRight(Node<T> right) {
            this.right = right;
        }
    }
}