class Dominoes
  def self.chain?(dominoes)
    return true if dominoes.empty?
    
    # Tomamos la primera ficha como el punto de partida de nuestra cadena
    first_domino = dominoes[0]
    remaining = dominoes[1..-1]

    # Intentamos construir el camino empezando con la ficha en su orientación original
    return true if backtrack(first_domino[1], first_domino[0], remaining)
    
    # Si no funcionó, intentamos volteando la primera ficha (si sus números son distintos)
    if first_domino[0] != first_domino[1]
      return true if backtrack(first_domino[0], first_domino[1], remaining)
    end

    false
  end

  private

  # Método recursivo de exploración (Backtracking)
  def self.backtrack(current_tail, target_head, remaining_dominoes)
    # Condición de éxito: No quedan más fichas y logramos cerrar el ciclo
    return current_tail == target_head if remaining_dominoes.empty?

    remaining_dominoes.each_with_index do |domino, index|
      # Caso A: La ficha conecta de forma natural [current_tail, algo]
      if domino[0] == current_tail
        next_remaining = remaining_dominoes.dup
        next_remaining.delete_at(index)
        return true if backtrack(domino[1], target_head, next_remaining)

      # Caso B: La ficha conecta si la giramos al revés [algo, current_tail]
      elsif domino[1] == current_tail
        next_remaining = remaining_dominoes.dup
        next_remaining.delete_at(index)
        return true if backtrack(domino[0], target_head, next_remaining)
      end
    end

    # Si ninguna de las fichas restantes encajó en este camino, retrocedemos
    false
  end
end