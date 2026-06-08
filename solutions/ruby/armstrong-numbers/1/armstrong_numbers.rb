module ArmstrongNumbers
  def self.include?(number)
    # 1. Convertimos el número a string para separar sus dígitos
    digits_as_strings = number.to_s.chars
    
    # 2. Obtenemos la cantidad total de dígitos (el exponente k)
    exponent = digits_as_strings.length
    
    # 3. Calculamos la suma: cada dígito elevado al exponente
    sum = digits_as_strings.sum do |digit|
      digit.to_i**exponent
    end
    
    # 4. Retornamos si la suma es igual al número original
    sum == number
  end
end