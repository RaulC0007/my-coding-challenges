export class InputCell {
  constructor(value) {
    this.value = value;
    this.dependents = [];
  }

  setValue(newValue) {
    if (this.value === newValue) {
      return;
    }

    // 1. Gather all downstream compute cells
    const descendants = new Set();
    const gather = (cell) => {
      for (const dep of cell.dependents) {
        descendants.add(dep);
        gather(dep); 
      }
    };
    gather(this);

    // 2. Snapshot the current stable values BEFORE the input changes
    const oldValues = new Map();
    for (const cell of descendants) {
      // Because ComputeCell uses a getter, this evaluates to the current stable state
      oldValues.set(cell, cell.value); 
    }

    // 3. Apply the state change to the input
    this.value = newValue;

    // 4. Compare the new dynamic state against the snapshot to trigger callbacks
    for (const cell of descendants) {
      if (cell.value !== oldValues.get(cell)) {
        for (const callback of cell.callbacks) {
          callback.fn(cell);
        }
      }
    }
  }
}

export class ComputeCell {
  constructor(inputCells, fn) {
    this.inputs = inputCells;
    this.fn = fn;
    this.callbacks = [];
    this.dependents = [];

    // Wire up this instance as a dependent of all its input cells
    for (const cell of inputCells) {
      cell.dependents.push(this);
    }
  }

  // Use a getter instead of a static property!
  // This ensures the cell evaluates dynamically, removing the need for a recompute() loop.
  get value() {
    return this.fn(this.inputs);
  }

  addCallback(cb) {
    this.callbacks.push(cb);
  }

  removeCallback(cb) {
    this.callbacks = this.callbacks.filter(callback => callback !== cb);
  }
}

export class CallbackCell {
  constructor(fn) {
    this.values = [];
    this.fn = (cell) => {
      this.values.push(fn(cell));
    };
  }
}

