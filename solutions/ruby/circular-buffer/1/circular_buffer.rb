class CircularBuffer
  # Excepciones personalizadas requeridas por la suite de pruebas
  class BufferEmptyException < StandardError; end
  class BufferFullException < StandardError; end

  def initialize(capacity)
    @capacity = capacity
    @buffer = []
  end

  # Lee (y elimina) el dato más antiguo del buffer
  def read
    raise BufferEmptyException, "Buffer is empty" if empty?

    @buffer.shift
  end

  # Escribe un nuevo elemento. Falla si el buffer está lleno.
  def write(element)
    raise BufferFullException, "Buffer is full" if full?

    @buffer << element
  end

  # Escribe un nuevo elemento de forma forzada. 
  # Si está lleno, sobreescribe el más viejo.
  def write!(element)
    read if full?
    write(element)
  end

  # Vacía el buffer por completo
  def clear
    @buffer.clear
  end

  private

  def empty?
    @buffer.empty?
  end

  def full?
    @buffer.length >= @capacity
  end
end