class PhoneNumber
  def self.clean(number)
    # 1. Extraemos solo los dígitos numéricos
    digits = number.gsub(/\D/, '')

    # 2. Manejamos el código de país (11 dígitos empezando por 1)
    if digits.length == 11 && digits.start_with?('1')
      digits = digits[1..-1]
    end

    # 3. Validamos la longitud final de 10 dígitos
    return nil unless digits.length == 10

    # 4. Validamos las reglas NXX (Código de área e intercambio entre 2-9)
    # El primer dígito (área) y el cuarto dígito (intercambio) no pueden ser 0 o 1
    return nil if digits[0].to_i < 2 || digits[3].to_i < 2

    # 5. Si pasa todas las pruebas, devolvemos el número limpio
    digits
  end
end