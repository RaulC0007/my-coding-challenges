class Alphametics
  def self.solve(puzzle)
    # 1. Separar términos y el resultado
    words = puzzle.scan(/[A-Z]+/)
    letters = words.join.chars.uniq
    first_letters = words.map { |w| w[0] }.uniq

    # 2. Calcular el "peso" de cada letra en la ecuación total
    # Ejemplo: SEND + MORE == MONEY  => SEND + MORE - MONEY == 0
    weights = Hash.new(0)
    words.each_with_index do |word, index|
      # Los términos antes del '=' suman, el último (resultado) resta
      sign = (index == words.size - 1) ? -1 : 1
      word.reverse.chars.each_with_index do |char, i|
        weights[char] += sign * (10**i)
      end
    end

    # Convertimos a arreglos para acelerar el bucle
    sorted_letters = weights.keys
    sorted_weights = sorted_letters.map { |l| weights[l] }
    first_letter_indices = first_letters.map { |l| sorted_letters.index(l) }

    # 3. Probar permutaciones de dígitos (0..9) para el número de letras
    (0..9).to_a.permutation(sorted_letters.size).each do |digits|
      # Regla: La primera letra de una palabra no puede ser 0
      next if first_letter_indices.any? { |i| digits[i] == 0 }

      # Calcular la suma ponderada: sum(peso * dígito)
      sum = 0
      i = 0
      while i < digits.size
        sum += digits[i] * sorted_weights[i]
        i += 1
      end

      # Si la suma es 0, hemos encontrado la solución
      if sum == 0
        return sorted_letters.zip(digits).to_h
      end
    end

    {} # Si no hay solución
  end
end