class CircularBuffer {
  constructor(size) {
    this.buffer = new Array(size);
    this.size = size;
    this.readIndex = 0;
    this.writeIndex = 0;
    this.count = 0;
  }

  write(value) {
    if (this.count === this.size) {
      throw new BufferFullError('Buffer is full');
    }
    
    this.buffer[this.writeIndex] = value;
    this.writeIndex = (this.writeIndex + 1) % this.size;
    this.count++;
  }

  read() {
    if (this.count === 0) {
      throw new BufferEmptyError('Buffer is empty');
    }
    
    const value = this.buffer[this.readIndex];
    this.buffer[this.readIndex] = undefined;
    this.readIndex = (this.readIndex + 1) % this.size;
    this.count--;
    return value;
  }

  forceWrite(value) {
    if (this.count < this.size) {
      // If buffer is not full, do a normal write
      this.write(value);
    } else {
      // If buffer is full, overwrite the oldest value
      this.buffer[this.readIndex] = value;
      this.readIndex = (this.readIndex + 1) % this.size;
      this.writeIndex = (this.writeIndex + 1) % this.size;
      // count remains the same since we're replacing, not adding
    }
  }

  clear() {
    this.buffer = new Array(this.size);
    this.readIndex = 0;
    this.writeIndex = 0;
    this.count = 0;
  }
}

export class BufferFullError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BufferFullError';
  }
}

export class BufferEmptyError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BufferEmptyError';
  }
}

export default CircularBuffer;

