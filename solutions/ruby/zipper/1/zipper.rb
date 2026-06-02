# 1. Definición obligatoria de la estructura del árbol
class Node
  attr_reader :value, :left, :right

  def initialize(value, left, right)
    @value = value
    @left = left
    @right = right
  end

  # Método de comparación para los asserts de los nodos
  def ==(other)
    other.is_a?(Node) &&
      value == other.value &&
      left == other.left &&
      right == other.right
  end
end

# 2. Tu maravillosa implementación del Zipper funcional
class Zipper
  attr_reader :focus, :path

  def initialize(focus, path = [])
    @focus = focus
    @path = path
  end

  def self.from_tree(tree)
    Zipper.new(tree)
  end

  def to_tree
    current = self
    current = current.up while current.path.any?
    current.focus
  end

  def value
    @focus&.value
  end

  def left
    return nil if @focus&.left.nil?

    new_path = [{ direction: :left, value: @focus.value, right: @focus.right }] + @path
    Zipper.new(@focus.left, new_path)
  end

  def right
    return nil if @focus&.right.nil?

    new_path = [{ direction: :right, value: @focus.value, left: @focus.left }] + @path
    Zipper.new(@focus.right, new_path)
  end

  def up
    return nil if @path.empty?

    parent_crumb = @path.first
    remaining_path = @path[1..-1]

    new_node = if parent_crumb[:direction] == :left
                 Node.new(parent_crumb[:value], @focus, parent_crumb[:right])
               else
                 Node.new(parent_crumb[:value], parent_crumb[:left], @focus)
               end

    Zipper.new(new_node, remaining_path)
  end

  def set_value(new_value)
    new_node = Node.new(new_value, @focus&.left, @focus&.right)
    Zipper.new(new_node, @path)
  end

  def set_left(new_left)
    new_node = Node.new(@focus&.value, new_left, @focus&.right)
    Zipper.new(new_node, @path)
  end

  def set_right(new_right)
    new_node = Node.new(@focus&.value, @focus&.left, new_right)
    Zipper.new(new_node, @path)
  end

  # CORRECCIÓN: Método de comparación estructural para que pase el último test
  def ==(other)
    other.is_a?(Zipper) &&
      focus == other.focus &&
      path == other.path
  end
end