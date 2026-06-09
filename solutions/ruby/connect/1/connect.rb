class Board
  def initialize(board_lines)
    # Limpiamos los espacios de formato y dividimos cada fila en caracteres individuales
    @board = board_lines.map { |line| line.strip.split(/\s+/) }
    @height = @board.size
    @width  = @board.first ? @board.first.size : 0
  end

  def winner
    return 'X' if player_wins?('X')
    return 'O' if player_wins?('O')
    ''
  end

  private

  def player_wins?(player)
    # Definimos los puntos de partida y las condiciones de victoria de cada jugador
    if player == 'X'
      # De Izquierda a Derecha: empieza en col 0, gana al llegar a col máxima
      start_positions = (0...@height).map { |r| [r, 0] }.select { |r, c| @board[r][c] == 'X' }
      win_condition   = ->(r, c) { c == @width - 1 }
    else
      # De Arriba a Abajo: empieza en fila 0, gana al llegar a fila máxima
      start_positions = (0...@width).map { |c| [0, c] }.select { |r, c| @board[r][c] == 'O' }
      win_condition   = ->(r, c) { r == @height - 1 }
    end

    return false if start_positions.empty?

    # Ejecutamos un algoritmo de búsqueda (BFS) utilizando una cola
    queue = start_positions.dup
    visited = start_positions.to_h { |pos| [pos, true] }

    while queue.any?
      curr_r, curr_c = queue.shift

      return true if win_condition.call(curr_r, curr_c)

      # Buscamos los 6 vecinos hexagonales válidos del mismo jugador
      hex_neighbors(curr_r, curr_c).each do |nr, nc|
        next if visited[[nr, nc]]
        
        if @board[nr][nc] == player
          visited[[nr, nc]] = true
          queue << [nr, nc]
        end
      end
    end

    false
  end

  # Devuelve las coordenadas de los 6 vecinos geométricos en una red hexagonal
  def hex_neighbors(r, c)
    relative_coordinates = [
      [0, -1], [0, 1],   # Izquierda, Derecha
      [-1, 0], [-1, 1],  # Diagonales superiores
      [1, -1], [1, 0]    # Diagonales inferiores
    ]

    relative_coordinates.map { |dr, dc| [r + dr, c + dc] }.select do |nr, nc|
      # Nos aseguramos de retornar solo vecinos que estén dentro de los límites del tablero
      nr.between?(0, @height - 1) && nc.between?(0, @width - 1)
    end
  end
end