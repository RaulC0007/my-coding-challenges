class Grains
  # Definimos el rango válido de casillas
  SQUARES = 1..64

  def self.square(number)
    # 1. Validamos que la casilla esté dentro del rango del ajedrez
    raise ArgumentError, "La casilla debe estar entre 1 y 64" unless SQUARES.cover?(number)

    # 2. Calculamos 2 elevado a la potencia (número - 1)
    # Usamos el operador ** para potencias en Ruby
    2**(number - 1)
  end

  def self.total
    # La suma total de granos en 64 casillas es 2^64 - 1
    (2**64) - 1
  end
end