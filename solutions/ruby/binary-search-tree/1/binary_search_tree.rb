class Bst
  attr_reader :data, :left, :right

  def initialize(data)
    @data = data
    @left = nil
    @right = nil
  end

  # Inserta un nuevo valor en el lugar que le corresponde de forma recursiva
  def insert(new_data)
    if new_data <= @data
      # Si es menor o igual, va a la izquierda
      if @left.nil?
        @left = Bst.new(new_data)
      else
        @left.insert(new_data) # Delegación recursiva
      end
    else
      # Si es mayor, va a la derecha
      if @right.nil?
        @right = Bst.new(new_data)
      else
        @right.insert(new_data) # Delegación recursiva
      end
    end
    self
  end

  # Recorre el árbol en orden (In-Order Traversal) para devolver un arreglo ordenado
  # Si se le pasa un bloque, va entregando los datos uno a uno (comportamiento de enumerador)
  def each(&block)
    return to_enum(:each) unless block_given?

    # 1. Visitar subárbol izquierdo (valores más chicos)
    @left.each(&block) if @left

    # 2. Visitar la raíz actual
    yield @data

    # 3. Visitar subárbol derecho (valores más grandes)
    @right.each(&block) if @right
  end
end