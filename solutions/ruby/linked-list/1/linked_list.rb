class Deque
  class Node
    attr_accessor :value, :next, :prev

    def initialize(value)
      @value = value
      @next = nil
      @prev = nil
    end
  end

  def initialize
    @head = nil
    @tail = nil
    @size = 0 # Inicializamos el contador en cero
  end

  # Devuelve el número de elementos en la lista
  def count
    @size
  end

  def push(value)
    new_node = Node.new(value)
    if @tail.nil?
      @head = @tail = new_node
    else
      new_node.prev = @tail
      @tail.next = new_node
      @tail = new_node
    end
    @size += 1 # Sumamos una estación
  end

  def pop
    return nil if @tail.nil?

    removed_node = @tail
    @tail = @tail.prev

    if @tail.nil?
      @head = nil
    else
      @tail.next = nil
    end

    @size -= 1 # Restamos una estación
    removed_node.value
  end

  def unshift(value)
    new_node = Node.new(value)
    if @head.nil?
      @head = @tail = new_node
    else
      new_node.next = @head
      @head.prev = new_node
      @head = new_node
    end
    @size += 1 # Sumamos una estación
  end

  def shift
    return nil if @head.nil?

    removed_node = @head
    @head = @head.next

    if @head.nil?
      @tail = nil
    else
      @head.prev = nil
    end

    @size -= 1 # Restamos una estación
    removed_node.value
  end

  def delete(value)
    current = @head

    while current
      if current.value == value
        current.prev.next = current.next if current.prev
        current.next.prev = current.prev if current.next

        @head = current.next if current == @head
        @tail = current.prev if current == @tail

        @size -= 1 # Restamos una estación si la encontramos y eliminamos
        break
      end
      current = current.next
    end
  end
end