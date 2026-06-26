class Affine
  ALPHABET_SIZE = 26
  BASE_ASCII = 'a'.ord

  def initialize(a, b)
    # Validamos si 'a' y 26 son coprimos (Máximo Común Divisor debe ser 1)
    raise ArgumentError, "Error: a and m must be coprime." if a.gcd(ALPHABET_SIZE) != 1

    @a = a
    @b = b
    @mmi = find_mmi(a)
  end

  # Codifica el texto original
  def encode(plaintext)
    # Limpiamos el texto dejando solo letras minúsculas y números
    normalized = plaintext.downcase.gsub(/[^a-z0-9]/, '')

    encoded_chars = normalized.chars.map do |char|
      if char =~ /[0-9]/
        char # Los dígitos pasan directo sin alteración
      else
        x = char.ord - BASE_ASCII
        new_index = (@a * x + @b) % ALPHABET_SIZE
        (new_index + BASE_ASCII).chr
      end
    end

    # Agrupamos el resultado en bloques de 5 letras separadas por espacio
    encoded_chars.join.scan(/.{1,5}/).join(' ')
  end

  # Decodifica el texto cifrado
  def decode(ciphertext)
    # Removemos los espacios del texto cifrado para procesarlo de forma continua
    cleaned = ciphertext.gsub(/\s+/, '')

    cleaned.chars.map do |char|
      if char =~ /[0-9]/
        char # Los dígitos se mantienen intactos
      else
        y = char.ord - BASE_ASCII
        # Aplicamos la fórmula de descifrado modular
        new_index = (@mmi * (y - @b)) % ALPHABET_SIZE
        (new_index + BASE_ASCII).chr
      end
    end.join
  end

  private

  # Encuentra el Inverso Multiplicativo Modular de 'a' mod 26
  def find_mmi(a)
    (1...ALPHABET_SIZE).find { |x| (a * x) % ALPHABET_SIZE == 1 }
  end
end