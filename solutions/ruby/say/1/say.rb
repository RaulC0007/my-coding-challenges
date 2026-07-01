class Say
  def initialize(number)
    @number = number
  end

  def in_english
    raise ArgumentError, 'Number out of range' unless @number.between?(0, 999_999_999_999)
    return 'zero' if @number.zero?

    chunks = []
    remaining = @number

    # Definimos las escalas grandes con sus respectivos valores divisores
    scales = [
      ['billion', 1_000_000_000],
      ['million', 1_000_000],
      ['thousand', 1_000]
    ]

    # Extraemos los fragmentos grandes secuencialmente
    scales.each do |name, divisor|
      if remaining >= divisor
        count = remaining / divisor
        remaining %= divisor
        chunks << "#{say_three_digits(count)} #{name}"
      end
    end

    # Si sobra algo después de los millares, es el bloque final (< 1000)
    chunks << say_three_digits(remaining) if remaining > 0

    # Unimos todos los fragmentos con espacios limpios
    chunks.join(' ')
  end

  private

  # Diccionarios estáticos para traducir componentes numéricos de forma directa
  ONES = %w[zero one two three four five six seven eight nine].freeze
  TEENS = %w[ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen].freeze
  TENS = %w[nil nil twenty thirty forty fifty sixty seventy eighty ninety].freeze

  # Traduce cualquier número de 1 a 999
  def say_three_digits(num)
    parts = []

    # Procesamos las centenas
    if num >= 100
      parts << "#{ONES[num / 100]} hundred"
      num %= 100
    end

    # Procesamos el resto (decenas y unidades)
    if num >= 20
      tens = TENS[num / 10]
      ones = num % 10
      parts << (ones.zero? ? tens : "#{tens}-#{ONES[ones]}")
    elsif num >= 10
      parts << TEENS[num - 10]
    elsif num > 0
      parts << ONES[num]
    end

    parts.join(' ')
  end
end