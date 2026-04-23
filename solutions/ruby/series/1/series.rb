class Series
  def initialize(digits)
    # El test espera que un string vacío sea un error
    raise ArgumentError, "String cannot be empty" if digits.empty?
    
    @digits = digits
  end

  def slices(n)
    # Validaciones sobre el tamaño de la rebanada (n)
    raise ArgumentError, "Slice size is too large" if n > @digits.length
    raise ArgumentError, "Slice size cannot be zero or negative" if n <= 0

    @digits.chars.each_cons(n).map(&:join)
  end
end