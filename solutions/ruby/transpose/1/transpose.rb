class Transpose
  def self.transpose(input)
    # 1. Convertimos el input en un arreglo de filas
    lines = input.split("\n")
    return "" if lines.empty?

    # 2. Calculamos la longitud máxima de las filas
    max_length = lines.map(&:length).max
    
    # 3. Transponemos recorriendo cada índice de columna posible
    result = (0...max_length).map do |col_idx|
      # Para cada columna, iteramos sobre las filas originales
      lines.each_with_index.map do |line, row_idx|
        # Buscamos la longitud máxima que alcanzan las filas que vienen después
        # Esto nos dirá si debemos rellenar con un espacio o dejar vacío
        max_future_length = lines[row_idx..].map(&:length).max
        
        if col_idx < line.length
          line[col_idx]
        elsif col_idx < max_future_length
          " "
        else
          nil
        end
      end.join
    end

    # 4. Unimos las nuevas filas con saltos de línea
    result.join("\n")
  end
end