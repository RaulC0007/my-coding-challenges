class Crypto
  def initialize(plaintext)
    @plaintext = plaintext
  end

  def ciphertext
    # 1. Normalizar el texto
    normalized = @plaintext.downcase.gsub(/[^a-z0-9]/, '')
    return "" if normalized.empty?

    # 2. Calcular el número de columnas (c) y filas (r)
    # Math.sqrt nos da la base ideal para un rectángulo lo más cuadrado posible
    c = Math.sqrt(normalized.length).ceil
    r = (c * (c - 1) >= normalized.length) ? c - 1 : c

    # 3. Rellenar con espacios para formar el rectángulo perfecto (c x r)
    padded_text = normalized.ljust(c * r, ' ')

    # 4. Dividir en las filas del rectángulo
    # Ejemplo: ["ifmanwas", "meanttos", ...]
    rows = padded_text.scan(/.{1,#{c}}/)

    # 5. Convertir cada string de fila en un arreglo de caracteres individuales
    # para poder usar la magia de la transposición de Ruby
    matrix = rows.map(&:chars)

    # 6. Transponer la matriz (las columnas se vuelven filas) y unir las nuevas piezas
    # Unimos los caracteres de cada columna nueva y luego separamos los bloques por un espacio
    matrix.transpose.map(&:join).join(' ')
  end
end