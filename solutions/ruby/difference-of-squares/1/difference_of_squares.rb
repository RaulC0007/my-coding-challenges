class Squares
  def initialize(n)
    @n = n
  end

  def square_of_sum
    # Fórmula: (n * (n + 1) / 2) ^ 2
    sum = (@n * (@n + 1)) / 2
    sum**2
  end

  def sum_of_squares
    # Fórmula: n * (n + 1) * (2n + 1) / 6
    (@n * (@n + 1) * (2 * @n + 1)) / 6
  end

  def difference
    square_of_sum - sum_of_squares
  end
end