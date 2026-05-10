class Palindromes
  Result = Struct.new(:value, :factors)

  def initialize(max_factor:, min_factor: 1)
    raise ArgumentError, "min must be <= max" if min_factor > max_factor
    @max = max_factor
    @min = min_factor
    @found_smallest = nil
    @found_largest = nil
  end

  # Los tests de Exercism llaman a .generate, 
  # pero ahora haremos la búsqueda bajo demanda para ganar velocidad.
  def generate; end

  def smallest
    min_prod = @min**2
    max_prod = @max**2

    (min_prod..max_prod).each do |product|
      if palindrome?(product)
        factors = get_factors(product)
        return Result.new(product, factors) unless factors.empty?
      end
    end
    Result.new(nil, [])
  end

  def largest
    max_prod = @max**2
    min_prod = @min**2

    max_prod.downto(min_prod) do |product|
      if palindrome?(product)
        factors = get_factors(product)
        return Result.new(product, factors) unless factors.empty?
      end
    end
    Result.new(nil, [])
  end

  private

  def palindrome?(number)
    s = number.to_s
    s == s.reverse
  end

  # Busca factores válidos dentro del rango para un producto dado
  def get_factors(product)
    factors = []
    # Solo buscamos hasta la raíz cuadrada del producto para optimizar
    limit = Math.sqrt(product).to_i
    
    (@min..limit).each do |f1|
      if product % f1 == 0
        f2 = product / f1
        if f2 <= @max && f2 >= @min
          factors << [f1, f2]
        end
      end
    end
    factors
  end
end