class Triangle
  def initialize(sides)
    @sides = sides
  end

  def equilateral?
    valid? && unique_sides == 1
  end

  def isosceles?
    valid? && unique_sides <= 2
  end

  def scalene?
    valid? && unique_sides == 3
  end

  private

  def unique_sides
    @sides.uniq.size
  end

  def valid?
    # 1. Todos los lados deben ser > 0
    # 2. El lado más largo debe ser menor o igual a la suma de los otros dos
    return false if @sides.any? { |s| s <= 0 }
    
    a, b, c = @sides.sort
    a + b >= c
  end
end