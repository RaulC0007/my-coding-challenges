class RunLengthEncoding
  def self.encode(input)
    # Buscamos secuencias del mismo carácter repetido
    input.gsub(/(.)\1+/) do |match|
      # match.length nos da cuántas veces se repite, match[0] es el carácter
      "#{match.length}#{match[0]}"
    end
  end

  def self.decode(input)
    # Buscamos dígitos opcionales seguidos de un carácter
    input.gsub(/(\d+)(.)/) do
      # $1 guarda el número (como string) y $2 guarda el carácter
      $2 * $1.to_i
    end
  end
end