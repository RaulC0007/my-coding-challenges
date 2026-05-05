class Grid
  def self.saddle_points(matrix)
    # 1. Validación de matriz vacía
    return [] if matrix.empty? || matrix[0].empty?

    # 2. Obtenemos las columnas transponiendo las filas
    # En Ruby, transpose funciona sobre arreglos de arreglos
    rows = matrix
    columns = matrix.transpose

    # 3. Pre-calculamos los máximos de cada fila y mínimos de cada columna
    row_maxima = rows.map(&:max)
    col_minima = columns.map(&:min)

    points = []

    # 4. Buscamos las coordenadas que cumplen ambas condiciones
    rows.each_with_index do |row, r_idx|
      row.each_with_index do |value, c_idx|
        if value == row_maxima[r_idx] && value == col_minima[c_idx]
          # Construimos el Hash con el formato esperado por el test
          points << { "row" => r_idx + 1, "column" => c_idx + 1 }
        end
      end
    end

    points
  end
end