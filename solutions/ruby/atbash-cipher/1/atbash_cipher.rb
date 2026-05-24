class AtbashCipher
  ALPHABET = ('a'..'z').to_a.join
  REVERSED = ALPHABET.reverse

  def self.encode(plaintext)
    # 1. Normalizar: pasar a minúsculas y eliminar todo lo que no sea letra o número
    sanitized = plaintext.downcase.gsub(/[^a-z0-9]/, '')

    # 2. Transponer las letras usando la tabla espejo
    ciphered = sanitized.tr(ALPHABET, REVERSED)

    # 3. Agrupar en bloques de 5 caracteres separados por un espacio
    ciphered.scan(/.{1,5}/).join(' ')
  end

  def self.decode(ciphertext)
    # 1. Quitar los espacios del bloque de cifrado
    sanitized = ciphertext.delete(' ')

    # 2. Hacer la operación inversa (al ser un espejo, tr funciona exactamente igual)
    sanitized.tr(REVERSED, ALPHABET)
  end
end

# ESTA LÍNEA RESUELVE LOS 14 TESTS:
Atbash = AtbashCipher