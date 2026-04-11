export class Node<T> {
  data: T;
  next: Node<T> | null;
  prev: Node<T> | null;

  constructor(data: T) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

export class LinkedList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  public push(data: T): void {
    const newNode = new Node(data);
    
    if (this.tail === null) {
      // Empty list
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
    
    this.length++;
  }

  public pop(): T {
    if (this.tail === null) {
      throw new Error('Cannot pop from empty list');
    }
    
    const removedNode = this.tail;
    const data = removedNode.data;
    
    if (this.tail === this.head) {
      // Only one node in the list
      this.head = null;
      this.tail = null;
    } else {
      this.tail = removedNode.prev;
      this.tail!.next = null;
    }
    
    this.length--;
    return data;
  }

  public shift(): T {
    if (this.head === null) {
      throw new Error('Cannot shift from empty list');
    }
    
    const removedNode = this.head;
    const data = removedNode.data;
    
    if (this.head === this.tail) {
      // Only one node in the list
      this.head = null;
      this.tail = null;
    } else {
      this.head = removedNode.next;
      this.head!.prev = null;
    }
    
    this.length--;
    return data;
  }

  public unshift(data: T): void {
    const newNode = new Node(data);
    
    if (this.head === null) {
      // Empty list
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    
    this.length++;
  }

  public delete(data: T): void {
    let current = this.head;
    
    while (current !== null) {
      if (current.data === data) {
        // Found the node to delete
        if (current === this.head && current === this.tail) {
          // Only node in the list
          this.head = null;
          this.tail = null;
        } else if (current === this.head) {
          // Node is the head
          this.head = current.next;
          this.head!.prev = null;
        } else if (current === this.tail) {
          // Node is the tail
          this.tail = current.prev;
          this.tail!.next = null;
        } else {
          // Node is in the middle
          current.prev!.next = current.next;
          current.next!.prev = current.prev;
        }
        
        this.length--;
        return;
      }
      
      current = current.next;
    }
  }

  public count(): number {
    return this.length;
  }
}

