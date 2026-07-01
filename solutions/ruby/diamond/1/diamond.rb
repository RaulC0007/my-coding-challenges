class Diamond
  def self.make_diamond(target_letter)
    # Generamos el rango de letras desde 'A' hasta la letra objetivo
    letters = ('A'..target_letter).to_a
    
    # El "radio" o distancia determina cuántos espacios externos tiene la fila 'A'
    max_index = letters.size - 1

    # 1. Construimos la mitad superior (incluyendo la línea del medio)
    top_half = letters.each_with_index.map do |letter, index|
      outer_spaces = ' ' * (max_index - index)
      
      if index == 0
        # La fila de la 'A' es única porque no tiene espacios internos
        "#{outer_spaces}A#{outer_spaces}\n"
      else
        # Filas de la 'B' en adelante llevan espacios internos
        inner_spaces = ' ' * (2 * index - 1)
        "#{outer_spaces}#{letter}#{inner_spaces}#{letter}#{outer_spaces}\n"
      end
    end

    # 2. La mitad inferior es idéntica a la superior, pero invertida y omitiendo el centro
    bottom_half = top_half[0...-1].reverse

    # 3. Unimos todo en un solo string
    (top_half + bottom_half).join
  end
end