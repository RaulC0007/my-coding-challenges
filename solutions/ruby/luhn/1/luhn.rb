class Luhn
  def self.valid?(string)
    # 1. Limpieza inicial: quitamos espacios
    clean_string = string.gsub(/\s+/, "")

    # 2. Validaciones básicas: longitud > 1 y solo dígitos
    return false if clean_string.length <= 1
    return false if clean_string.match?(/\D/) # \D busca cualquier cosa que NO sea dígito

    # 3. Procesamiento del algoritmo
    digits = clean_string.chars.map(&:to_i).reverse
    
    sum = digits.each_with_index.sum do |digit, index|
      if index.odd? # El segundo, cuarto, sexto... (índices 1, 3, 5...)
        doubled = digit * 2
        doubled > 9 ? doubled - 9 : doubled
      else
        digit
      end
    end

    # 4. Verificación final
    (sum % 10).zero?
  end
end