class PrimeFactors
  def self.of(number)
    factors = []
    divisor = 2

    # El ciclo continúa hasta que el número se reduzca a 1
    while number > 1
      if number % divisor == 0
        factors << divisor
        number /= divisor
      else
        # Si no es divisible de forma exacta, pasamos al siguiente número
        divisor += 1
      end
    end

    factors
  end
end