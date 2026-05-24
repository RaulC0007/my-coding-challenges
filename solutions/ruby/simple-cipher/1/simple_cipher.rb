class Cipher
  attr_reader :key

  # Definimos el valor ASCII de la 'a' minúscula como base para los cálculos
  BASE_ASCII = 'a'.ord

  def initialize(key = nil)
    if key
      # Validamos que la clave no esté vacía y contenga únicamente letras minúsculas
      raise ArgumentError, "Invalid key format" if key.empty? || key =~ /[^a-z]/
      @key = key
    else
      # Generamos una clave aleatoria de 100 letras minúsculas si no se proporciona una
      @key = Array.new(100) { ('a'..'z').to_a.sample }.join
    end
  end

  def encode(plaintext)
    process(plaintext, :+)
  end

  def decode(ciphertext)
    process(ciphertext, :-)
  end

  private

  # Método auxiliar para unificar la lógica de codificación y decodificación
  def process(text, operation)
    text.chars.map.with_index do |char, index|
      # Encontramos la letra de la clave correspondiente (usando módulo % para el ciclo repetitivo)
      key_char = @key[index % @key.length]
      
      # Calculamos la distancia de desplazamiento de la clave (a = 0, b = 1, etc.)
      shift = key_char.ord - BASE_ASCII
      
      # Convertimos el carácter actual a base 0
      char_index = char.ord - BASE_ASCII
      
      # Aplicamos dinámicamente la operación (+ para codificar, - para decodificar)
      new_index = char_index.send(operation, shift) % 26
      
      # Regresamos el nuevo índice a su carácter ASCII correspondiente
      (new_index + BASE_ASCII).chr
    end.join
  end
end