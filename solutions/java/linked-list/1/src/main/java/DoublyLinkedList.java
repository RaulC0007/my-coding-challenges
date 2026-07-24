class DoublyLinkedList<T> {
    private Element<T> head;
    private Element<T> tail;
    private int size;

    void push(T value) {
        Element<T> newElement = new Element<>(value, tail, null);
        if (tail != null) {
            tail.next = newElement;
        } else {
            head = newElement;
        }
        tail = newElement;
        size++;
    }

    T pop() {
        if (tail == null) {
            return null;
        }
        T value = tail.value;
        tail = tail.prev;
        if (tail != null) {
            tail.next = null;
        } else {
            head = null;
        }
        size--;
        return value;
    }

    void unshift(T value) {
        Element<T> newElement = new Element<>(value, null, head);
        if (head != null) {
            head.prev = newElement;
        } else {
            tail = newElement;
        }
        head = newElement;
        size++;
    }

    T shift() {
        if (head == null) {
            return null;
        }
        T value = head.value;
        head = head.next;
        if (head != null) {
            head.prev = null;
        } else {
            tail = null;
        }
        size--;
        return value;
    }

    void delete(T value) {
        Element<T> current = head;
        while (current != null) {
            if (current.value.equals(value)) {
                // Update previous node's next pointer
                if (current.prev != null) {
                    current.prev.next = current.next;
                } else {
                    head = current.next;
                }
                
                // Update next node's prev pointer
                if (current.next != null) {
                    current.next.prev = current.prev;
                } else {
                    tail = current.prev;
                }
                size--;
                return;
            }
            current = current.next;
        }
    }

    int count() {
        return size;
    }

    private static final class Element<T> {
        private final T value;
        private Element<T> prev;
        private Element<T> next;

        Element(T value, Element<T> prev, Element<T> next) {
            this.value = value;
            this.prev = prev;
            this.next = next;
        }
    }
}