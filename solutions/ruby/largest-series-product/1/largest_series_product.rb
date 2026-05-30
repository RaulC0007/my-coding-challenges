class Series
  def initialize(digits_string)
    # Validamos si la cadena contiene caracteres no numéricos
    raise ArgumentError, "Input string must contain only digits" if digits_string =~ /[^0-9]/

    @digits = digits_string.chars.map(&:to_i)
  end

  def largest_product(span)
    # 1. Validaciones de frontera para el tamaño del span
    raise ArgumentError, "Span cannot be negative" if span < 0
    raise ArgumentError, "Span cannot be longer than string length" if span > @digits.length

    # 2. Caso base matemático: El producto de una serie de longitud cero es 1
    return 1 if span == 0

    # 3. Buscamos el producto más alto usando ventanas deslizantes
    # .each_cons nos da grupos consecutivos y .inject(:*) los multiplica todos entre sí
    @digits.each_cons(span).map { |sub_series| sub_series.inject(:*) }.max
  end
end