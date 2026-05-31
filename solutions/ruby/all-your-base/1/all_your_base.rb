class BaseConverter
  def self.convert(input_base, digits, output_base)
    # 1. Validaciones de bases
    raise ArgumentError if input_base < 2 || output_base < 2
    
    # 2. Convertir de input_base a un número entero (Base 10)
    decimal_value = 0
    digits.reverse.each_with_index do |digit, index|
      raise ArgumentError if digit < 0 || digit >= input_base
      decimal_value += digit * (input_base**index)
    end

    # 3. Caso especial para el cero
    return [0] if decimal_value == 0

    # 4. Convertir de decimal a output_base
    result = []
    while decimal_value > 0
      # El residuo es el nuevo dígito en la base de destino
      result.unshift(decimal_value % output_base)
      # El cociente es lo que queda por procesar
      decimal_value /= output_base
    end

    result
  end
end