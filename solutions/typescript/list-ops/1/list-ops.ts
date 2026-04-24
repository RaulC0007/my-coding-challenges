export class List {
  private items: unknown[];

  constructor(...values: unknown[]) {
    this.items = [];
    for (let i = 0; i < values.length; i++) {
      this.items[i] = values[i];
    }
  }

  public static create(...values: unknown[]): List {
    return new List(...values);
  }

  public forEach(callback: (item: unknown) => void): void {
    for (let i = 0; i < this.items.length; i++) {
      callback(this.items[i]);
    }
  }

  public append(other: List): List {
    const result = new List();
    for (let i = 0; i < this.items.length; i++) {
      result.items[i] = this.items[i];
    }
    for (let i = 0; i < other.items.length; i++) {
      result.items[this.items.length + i] = other.items[i];
    }
    return result;
  }

  public concatenate(lists: List): List {
    const result = new List();
    let index = 0;
    
    // Add all items from current list
    for (let i = 0; i < this.items.length; i++) {
      result.items[index++] = this.items[i];
    }
    
    // Helper function to flatten nested lists
    const flatten = (list: List) => {
      for (let i = 0; i < list.items.length; i++) {
        const item = list.items[i];
        if (item instanceof List) {
          flatten(item);
        } else {
          result.items[index++] = item;
        }
      }
    };
    
    flatten(lists);
    return result;
  }

  public filter(predicate: (item: unknown) => boolean): List {
    const result = new List();
    let index = 0;
    for (let i = 0; i < this.items.length; i++) {
      if (predicate(this.items[i])) {
        result.items[index++] = this.items[i];
      }
    }
    return result;
  }

  public length(): number {
    let count = 0;
    for (let i = 0; i < this.items.length; i++) {
      count++;
    }
    return count;
  }

  public map<T>(func: (item: unknown) => T): List {
    const result = new List();
    for (let i = 0; i < this.items.length; i++) {
      result.items[i] = func(this.items[i]);
    }
    return result;
  }

  public foldl<T>(func: (acc: T, item: unknown) => T, initial: T): T {
    let acc = initial;
    for (let i = 0; i < this.items.length; i++) {
      acc = func(acc, this.items[i]);
    }
    return acc;
  }

  public foldr<T>(func: (acc: T, item: unknown) => T, initial: T): T {
    let acc = initial;
    for (let i = this.items.length - 1; i >= 0; i--) {
      acc = func(acc, this.items[i]);
    }
    return acc;
  }

  public reverse(): List {
    const result = new List();
    for (let i = 0; i < this.items.length; i++) {
      result.items[i] = this.items[this.items.length - 1 - i];
    }
    return result;
  }
}