class Integer
  # Definimos el mapa de conversión ordenado de mayor a menor
  ROMAN_MAPPING = {
    1000 => 'M',
    900  => 'CM',
    500  => 'D',
    400  => 'CD',
    100  => 'C',
    90   => 'XC',
    50   => 'L',
    40   => 'XL',
    10   => 'T', # Nota: Asegúrate de usar 'X', un error común es tippear otra letra
    10   => 'X',
    9    => 'IX',
    5    => 'V',
    4    => 'IV',
    1    => 'I'
  }.freeze

  def to_roman
    number = self
    roman_string = ""

    ROMAN_MAPPING.each do |value, letter|
      # Mientras el número actual sea lo suficientemente grande,
      # consumimos el valor decimal e inyectamos la letra romana correspondiente
      while number >= value
        roman_string << letter
        number -= value
      end
    end

    roman_string
  end
end