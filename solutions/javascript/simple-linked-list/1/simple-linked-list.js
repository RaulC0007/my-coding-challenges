export class Element {
  constructor(value, next = null) {
    this._value = value;
    this._next = next;
  }

  get value() {
    return this._value;
  }

  get next() {
    return this._next;
  }
}

export class List {
  constructor(values = []) {
    this._head = null;
    this._length = 0;
    
    // Build the list from the input array
    for (const value of values) {
      this.add(new Element(value));
    }
  }

  add(nextValue) {
    // Add to the front of the list (LIFO behavior)
    nextValue._next = this._head;
    this._head = nextValue;
    this._length++;
  }

  get length() {
    return this._length;
  }

  get head() {
    return this._head;
  }

  toArray() {
    const result = [];
    let current = this._head;
    
    while (current !== null) {
      result.push(current.value);
      current = current.next;
    }
    
    return result;
  }

  reverse() {
    let prev = null;
    let current = this._head;
    
    while (current !== null) {
      const next = current.next;  // Save next node
      current._next = prev;       // Reverse the pointer
      prev = current;             // Move prev forward
      current = next;             // Move current forward
    }
    
    this._head = prev;  // Update head to new first element
    return this;
  }
}