export class CustomSet {
  constructor(elements = []) {
    this._elements = [];
    
    // Add unique elements to the set
    for (const element of elements) {
      this.add(element);
    }
  }

  empty() {
    return this._elements.length === 0;
  }

  contains(element) {
    return this._elements.includes(element);
  }

  add(element) {
    if (!this.contains(element)) {
      this._elements.push(element);
    }
    return this;
  }

  subset(otherSet) {
    // Every element in this set must be in the other set
    for (const element of this._elements) {
      if (!otherSet.contains(element)) {
        return false;
      }
    }
    return true;
  }

  disjoint(otherSet) {
    // No common elements between sets
    for (const element of this._elements) {
      if (otherSet.contains(element)) {
        return false;
      }
    }
    return true;
  }

  eql(otherSet) {
    // Sets are equal if they have the same elements (order doesn't matter)
    if (this._elements.length !== otherSet._elements.length) {
      return false;
    }
    
    for (const element of this._elements) {
      if (!otherSet.contains(element)) {
        return false;
      }
    }
    return true;
  }

  union(otherSet) {
    const result = new CustomSet(this._elements);
    
    for (const element of otherSet._elements) {
      result.add(element);
    }
    
    return result;
  }

  intersection(otherSet) {
    const result = new CustomSet();
    
    for (const element of this._elements) {
      if (otherSet.contains(element)) {
        result.add(element);
      }
    }
    
    return result;
  }

  difference(otherSet) {
    const result = new CustomSet();
    
    for (const element of this._elements) {
      if (!otherSet.contains(element)) {
        result.add(element);
      }
    }
    
    return result;
  }
}
