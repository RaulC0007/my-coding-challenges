// 1. Definición de los errores personalizados requeridos por los tests
export class BufferEmptyError extends Error {
  constructor() {
    super('Buffer is empty');
    this.name = 'BufferEmptyError';
  }
}

export class BufferFullError extends Error {
  constructor() {
    super('Buffer is full');
    this.name = 'BufferFullError';
  }
}

// 2. Implementación de la clase genérica CircularBuffer
export default class CircularBuffer<T> {
  private buffer: (T | null)[];
  private capacity: number;
  private readIndex: number;
  private writeIndex: number;
  private size: number;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.buffer = new Array(capacity).fill(null);
    this.readIndex = 0;
    this.writeIndex = 0;
    this.size = 0;
  }

  /**
   * Lee y remueve el elemento más antiguo del buffer.
   * Lanza BufferEmptyError si no hay datos.
   */
  public read(): T {
    if (this.size === 0) {
      throw new BufferEmptyError();
    }

    const value = this.buffer[this.readIndex] as T;
    this.buffer[this.readIndex] = null; // Limpiamos la celda
    this.readIndex = (this.readIndex + 1) % this.capacity; // Avanzamos circularmente
    this.size--;

    return value;
  }

  /**
   * Escribe un elemento en el buffer.
   * Lanza BufferFullError si el buffer está lleno.
   */
  public write(value: T): void {
    if (this.size === this.capacity) {
      throw new BufferFullError();
    }

    this.buffer[this.writeIndex] = value;
    this.writeIndex = (this.writeIndex + 1) % this.capacity; // Avanzamos circularmente
    this.size++;
  }

  /**
   * Escribe un elemento sin importar si está lleno.
   * Si está lleno, sobrescribe el elemento más antiguo y avanza el puntero de lectura.
   */
  public forceWrite(value: T): void {
    if (this.size < this.capacity) {
      this.write(value);
    } else {
      // Al estar lleno, el nuevo dato pisa al más antiguo en el readIndex
      this.buffer[this.readIndex] = value;
      // El puntero de lectura avanza porque ese dato viejo ya se perdió
      this.readIndex = (this.readIndex + 1) % this.capacity;
      // El puntero de escritura sigue al de lectura en un buffer lleno corregido
      this.writeIndex = this.readIndex;
    }
  }

  /**
   * Restablece el buffer a su estado inicial vacío.
   */
  public clear(): void {
    this.buffer.fill(null);
    this.readIndex = 0;
    this.writeIndex = 0;
    this.size = 0;
  }
}