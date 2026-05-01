class Pangram
  # Definimos el alfabeto como una constante
  ALPHABET = ('a'..'z').to_a

  def self.pangram?(sentence)
    # 1. Normalizamos la frase a minúsculas
    downcased_sentence = sentence.downcase

    # 2. Verificamos si CADA letra del alfabeto está presente en la frase
    ALPHABET.all? { |char| downcased_sentence.include?(char) }
  end
end