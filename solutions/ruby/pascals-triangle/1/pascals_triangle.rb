class Triangle
  def initialize(row_count)
    @row_count = row_count
  end

  def rows
    return [] if @row_count <= 0

    # Inicializamos el triángulo con la primera fila
    triangle = [[1]]

    # Generamos el resto de las filas de forma consecutiva
    (@row_count - 1).times do
      last_row = triangle.last
      
      # Creamos los dos arreglos desplazados agregando ceros
      left_shift  = last_row + [0]
      right_shift = [0] + last_row

      # Sumamos ambos arreglos elemento por elemento para formar la nueva fila
      next_row = left_shift.zip(right_shift).map { |a, b| a + b }
      
      triangle << next_row
    end

    triangle
  end
end