class Queens
  # Cambiamos el nombre de la clase a Queens (en plural)
  def initialize(white: nil, black: nil)
    @white = white
    @black = black
    
    validate_positions
  end

  def attack?
    # Si alguna de las dos reinas no está en el tablero, no puede haber ataque
    return false if @white.nil? || @black.nil?

    w_row, w_col = @white
    b_row, b_col = @black

    # 1. Misma fila
    return true if w_row == b_row
    
    # 2. Misma columna
    return true if w_col == b_col
    
    # 3. Misma diagonal
    return true if (w_row - b_row).abs == (w_col - b_col).abs

    false
  end

  private

  def validate_positions
    # Validamos la posición de la reina blanca si está presente
    if @white
      unless @white.all? { |coord| coord.between?(0, 7) }
        raise ArgumentError, "White queen must be on the board (0-7)"
      end
    end

    # Validamos la posición de la reina negra si está presente
    if @black
      unless @black.all? { |coord| coord.between?(0, 7) }
        raise ArgumentError, "Black queen must be on the board (0-7)"
      end
    end

    # Validamos que no ocupen la misma casilla si ambas están presentes
    if @white && @black && @white == @black
      raise ArgumentError, "Queens cannot occupy the same position"
    end
  end
end