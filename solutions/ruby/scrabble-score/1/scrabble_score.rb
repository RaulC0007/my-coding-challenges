class Scrabble
  # 1. Definimos la tabla de valores de forma agrupada
  VALUES = {
    %w[A E I O U L N R S T] => 1,
    %w[D G]                => 2,
    %w[B C M P]            => 3,
    %w[F H V W Y]          => 4,
    %w[K]                  => 5,
    %w[J X]                => 8,
    %w[Q Z]                => 10
  }

  # 2. Transformamos esa tabla en un diccionario simple: { 'A' => 1, 'B' => 3 ... }
  # Usamos each_with_object para construir el nuevo Hash
  LETTER_VALUES = VALUES.each_with_object({}) do |(letters, value), hash|
    letters.each { |letter| hash[letter] = value }
  end

  def initialize(word)
    # Guardamos la palabra en mayúsculas y limpiamos espacios si los hay
    @word = word.to_s.upcase.strip
  end

  def score
    # 3. Convertimos la palabra en letras, buscamos su valor y sumamos
    # Si la letra no existe en nuestro diccionario, el valor será 0
    @word.chars.sum { |letter| LETTER_VALUES[letter] || 0 }
  end

  # Los tests de Exercism a veces piden un método de clase directo
  def self.score(word)
    new(word).score
  end
end