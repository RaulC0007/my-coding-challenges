# Clase que representa cada nodo individual (canción)
class Element
  attr_reader :datum
  attr_accessor :next

  def initialize(datum)
    @datum = datum
    @next = nil
  end
end

# Clase que maneja la estructura de la lista enlazada
class SimpleLinkedList
  attr_reader :head

  def initialize(array = [])
    @head = nil
    # Si nos pasan un arreglo al inicializar, cargamos sus elementos
    # Los recorremos al revés para que el orden de la lista coincida
    array.each { |datum| push(Element.new(datum)) } if array
  end

  # Agrega un elemento al inicio de la lista
  def push(element)
    element.next = @head
    @head = element
    self
  end

  # Remueve y devuelve el elemento al inicio de la lista
  def pop
    return nil if @head.nil?

    popped_element = @head
    @head = @head.next
    popped_element
  end

  # Convierte nuestra lista enlazada en un Arreglo estándar de Ruby
  def to_a
    array = []
    current = @head
    while current
      array << current.datum
      current = current.next
    end
    array
  end

  # Método de clase para instanciar una lista desde un arreglo directamente
  def self.from_a(array)
    return new if array.nil? || array.empty?
    
    # Exercism suele evaluar que la lista mantenga el orden del arreglo original,
    # dado que 'push' inserta al frente, pasamos el arreglo invertido para compensar.
    new(array.reverse)
  end

  # Invierte el orden de los punteros de la lista en su lugar (In-place)
  def reverse!
    previous = nil
    current = @head

    while current
      next_node = current.next  # Guardamos el resto de la lista
      current.next = previous   # Volteamos el puntero actual hacia atrás
      previous = current        # Movemos 'previous' un paso adelante
      current = next_node       # Movemos 'current' un paso adelante
    end

    @head = previous            # El último nodo procesado se convierte en la nueva cabeza
    self
  end
end