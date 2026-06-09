class ComplexNumber
  attr_reader :real, :imaginary

  def initialize(real, imaginary = 0)
    @real = real.to_f
    @imaginary = imaginary.to_f
  end

  # Suma: (a + c) + (b + d)i
  def +(other)
    ComplexNumber.new(real + other.real, imaginary + other.imaginary)
  end

  # Resta: (a - c) + (b - d)i
  def -(other)
    ComplexNumber.new(real - other.real, imaginary - other.imaginary)
  end

  # Multiplicación: (a*c - b*d) + (b*c + a*d)i
  def *(other)
    new_real = real * other.real - imaginary * other.imaginary
    new_imag = imaginary * other.real + real * other.imaginary
    ComplexNumber.new(new_real, new_imag)
  end

  # División: ((a*c + b*d) / denominator) + ((b*c - a*d) / denominator)i
  def /(other)
    denominator = other.real**2 + other.imaginary**2
    new_real = (real * other.real + imaginary * other.imaginary) / denominator
    new_imag = (imaginary * other.real - real * other.imaginary) / denominator
    ComplexNumber.new(new_real, new_imag)
  end

  # Conjugado: a - bi
  def conjugate
    ComplexNumber.new(real, -imaginary)
  end

  # Valor Absoluto (Módulo): sqrt(a^2 + b^2)
  def abs
    Math.sqrt(real**2 + imaginary**2)
  end

  # Exponenciación de e: e^a * cos(b) + (e^a * sin(b))i
  def exp
    factor = Math.exp(real)
    ComplexNumber.new(factor * Math.cos(imaginary), factor * Math.sin(imaginary))
  end

  # Método de comparación para que los asserts de los tests funcionen correctamente
  def ==(other)
    return false unless other.is_a?(ComplexNumber)
    
    # Usamos delta/tolerancia por imprecisiones decimales de punto flotante (Float)
    (real - other.real).abs < 1e-9 && (imaginary - other.imaginary).abs < 1e-9
  end
end