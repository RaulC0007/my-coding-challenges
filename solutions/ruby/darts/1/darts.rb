class Darts
  def initialize(x, y)
    # Math.hypot(x, y) calcula automáticamente la raíz cuadrada de (x**2 + y**2)
    @distance = Math.hypot(x, y)
  end

  def score
    if @distance <= 1
      10
    elsif @distance <= 5
      5
    elsif @distance <= 10
      1
    else
      0
    end
  end
end