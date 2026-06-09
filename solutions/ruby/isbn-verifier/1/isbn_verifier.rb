class IsbnVerifier
  def self.valid?(string)
    # 1. Limpiamos la cadena eliminando todos los guiones
    clean_string = string.gsub('-', '')

    # 2. Validamos el formato exacto con Regex:
    # ^\d{9}    -> Debe empezar exactamente con 9 dígitos.
    # [\dX]$    -> Debe terminar exactamente con un dígito o una 'X'.
    return false unless clean_string =~ /^\d{9}[\dX]$/

    # 3. Convertimos los caracteres en un arreglo de números
    digits = clean_string.chars.map do |char|
      char == 'X' ? 10 : char.to_i
    end

    # 4. Aplicamos la fórmula: d1*10 + d2*9 + ... + d10*1
    # zip combina los dígitos con el rango descendente (10..1)
    total_sum = digits.zip(10.downto(1)).sum { |digit, weight| digit * weight }

    # 5. Si el residuo con 11 es 0, es válido
    (total_sum % 11).zero?
  end
end