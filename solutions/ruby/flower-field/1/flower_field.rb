class FlowerField
  # Cambiado de self.transform a self.annotate para que coincida con el test
  def self.annotate(board)
    # 1. Validaciones básicas de estructura
    return board if board.empty? || board.first.empty?
    raise ArgumentError unless valid_board?(board)

    rows = board.length
    cols = board.first.length

    # Convertimos las cadenas en una matriz de caracteres
    matrix = board.map(&:chars)

    # 2. Recorremos cada celda de la matriz
    (0...rows).map do |r|
      (0...cols).map do |c|
        if matrix[r][c] == '*'
          '*' 
        else
          count = count_adjacent_flowers(matrix, r, c, rows, cols)
          count > 0 ? count.to_s : ' ' 
        end
      end.join 
    end
  end

  private

  def self.valid_board?(board)
    board.map(&:length).uniq.size == 1
  end

  def self.count_adjacent_flowers(matrix, r, c, max_rows, max_cols)
    flowers = 0

    (-1..1).each do |dr|
      (-1..1).each do |dc|
        next if dr == 0 && dc == 0 

        neighbor_r = r + dr
        neighbor_c = c + dc

        if neighbor_r.between?(0, max_rows - 1) && neighbor_c.between?(0, max_cols - 1)
          flowers += 1 if matrix[neighbor_r][neighbor_c] == '*'
        end
      end
    end

    flowers
  end
end