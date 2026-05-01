class SpiralMatrix
  def initialize(size)
    @size = size
  end

  def matrix
    # Creamos la estructura de la matriz llena de nil o ceros
    matrix = Array.new(@size) { Array.new(@size) }
    
    # Definimos los límites iniciales
    top, bottom = 0, @size - 1
    left, right = 0, @size - 1
    current_number = 1

    while current_number <= @size**2
      # 1. De izquierda a derecha en la fila superior
      (left..right).each do |i|
        matrix[top][i] = current_number
        current_number += 1
      end
      top += 1

      # 2. De arriba hacia abajo en la columna derecha
      (top..bottom).each do |i|
        matrix[i][right] = current_number
        current_number += 1
      end
      right -= 1

      # 3. De derecha a izquierda en la fila inferior
      right.downto(left).each do |i|
        matrix[bottom][i] = current_number
        current_number += 1
      end
      bottom -= 1

      # 4. De abajo hacia arriba en la columna izquierda
      bottom.downto(top).each do |i|
        matrix[i][left] = current_number
        current_number += 1
      end
      left += 1
    end

    matrix
  end
end