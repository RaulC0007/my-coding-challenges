class SumOfMultiples
  def initialize(*factors)
    # Guardamos los factores eliminando los ceros para evitar errores matemáticos
    @factors = factors.reject(&:zero?)
  end

  def to(limit)
    # 1. Creamos un rango desde 1 hasta el límite (excluyéndolo con '...')
    # 2. Seleccionamos solo los números que son múltiplos de alguno de nuestros factores
    # 3. Sumamos el resultado
    (1...limit).select do |number|
      any_multiple?(number)
    end.sum
  end

  private

  # Método auxiliar para verificar si un número es múltiplo de algún factor
  def any_multiple?(number)
    @factors.any? { |factor| (number % factor).zero? }
  end
end