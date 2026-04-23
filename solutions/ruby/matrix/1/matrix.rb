class Matrix
  def initialize(matrix_string)
    @matrix_string = matrix_string
  end

  # Mantenemos este método para procesar la matriz completa
  def rows
    @rows ||= @matrix_string.split("\n").map do |row|
      row.split.map(&:to_i)
    end
  end

  # Mantenemos este para las columnas completas
  def columns
    rows.transpose
  end

  # NUEVO: Método que pide el test para una fila específica
  def row(index)
    # Restamos 1 porque los tests usan base 1 y Ruby usa base 0
    rows[index - 1]
  end

  # NUEVO: Método que pide el test para una columna específica
  def column(index)
    columns[index - 1]
  end
end