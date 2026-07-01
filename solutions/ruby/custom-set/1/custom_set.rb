class CustomSet
  attr_reader :elements

  def initialize(elements = [])
    # Guardamos los elementos como un arreglo único y limpio de duplicados
    @elements = elements.uniq
  end

  # Comprueba si el conjunto está vacío
  def empty?
    @elements.empty?
  end

  # Verifica la presencia de un elemento específico
  def contains?(element)
    @elements.include?(element)
  end
  
  # Creamos un alias para que los tests que buscan .member? pasen sin problemas
  alias_method :member?, :contains?

  # Determina si el conjunto actual es un subconjunto de otro conjunto
  def subset?(other)
    @elements.all? { |element| other.contains?(element) }
  end

  # Evalúa si dos conjuntos son disjuntos (no tienen elementos en común)
  def disjoint?(other)
    @elements.none? { |element| other.contains?(element) }
  end

  # Sobrescribimos el operador de igualdad
  def ==(other)
    return false unless other.is_a?(CustomSet)
    
    # Dos conjuntos son iguales si tienen el mismo tamaño y todos los elementos coinciden
    @elements.length == other.elements.length && subset?(other)
  end

  # Agrega un elemento mutando el conjunto (y manteniendo la unicidad)
  def add(element)
    @elements << element unless contains?(element)
    self
  end

  # Operación de Intersección: Elementos presentes en ambos conjuntos
  def intersection(other)
    common_elements = @elements.select { |element| other.contains?(element) }
    CustomSet.new(common_elements)
  end

  # Operación de Diferencia: Elementos de este conjunto que NO están en el otro
  def difference(other)
    different_elements = @elements.reject { |element| other.contains?(element) }
    CustomSet.new(different_elements)
  end

  # Operación de Unión: Combina todos los elementos de ambos conjuntos
  def union(other)
    CustomSet.new(@elements + other.elements)
  end
end