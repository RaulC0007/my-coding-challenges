import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

class SimpleLinkedList<T> {
    private Node<T> head;
    private int size;

    // Nodo interno para la lista enlazada
    private static class Node<T> {
        T value;
        Node<T> next;

        Node(T value) {
            this.value = value;
        }
    }

    // Constructor vacío
    SimpleLinkedList() {
    }

    // Constructor que recibe un array de valores
    SimpleLinkedList(T[] values) {
        for (T val : values) {
            push(val);
        }
    }

    // Añade un elemento al principio de la lista
    void push(T value) {
        Node<T> newNode = new Node<>(value);
        newNode.next = head;
        head = newNode;
        size++;
    }

    // Elimina y devuelve el elemento del principio de la lista
    T pop() {
        if (head == null) {
            throw new NoSuchElementException();
        }
        T value = head.value;
        head = head.next;
        size--;
        return value;
    }

    // Devuelve el elemento del principio de la lista sin eliminarlo
    T peek() {
        if (head == null) {
            throw new NoSuchElementException();
        }
        return head.value;
    }

    // Devuelve el número de elementos en la lista
    int size() {
        return size;
    }

    // Invierte el orden de la lista en su lugar
    void reverse() {
        Node<T> prev = null;
        Node<T> current = head;
        Node<T> next;

        while (current != null) {
            next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        head = prev;
    }

    // Convierte la lista enlazada en un array
    @SuppressWarnings("unchecked")
    T[] asArray(Class<T> cls) {
        List<T> list = new ArrayList<>();
        Node<T> current = head;
        while (current != null) {
            list.add(current.value);
            current = current.next;
        }
        
        T[] array = (T[]) Array.newInstance(cls, list.size());
        for (int i = 0; i < list.size(); i++) {
            array[i] = list.get(i);
        }
        return array;
    }

    // Convierte la lista enlazada en una java.util.List
    List<T> toList() {
        List<T> list = new ArrayList<>();
        Node<T> current = head;
        while (current != null) {
            list.add(current.value);
            current = current.next;
        }
        return list;
    }
}