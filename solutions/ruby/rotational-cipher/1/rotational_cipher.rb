class RotationalCipher
  def self.rotate(text, key)
    # 1. Crear los abecedarios base en minúscula y mayúscula como arreglos
    lower_base = ('a'..'z').to_a
    upper_base = ('A'..'Z').to_a

    # 2. Generar las versiones rotadas según la clave provista
    lower_rotated = lower_base.rotate(key)
    upper_rotated = upper_base.rotate(key)

    # 3. Combinar las bases y las rotadas en strings continuos para el método .tr
    origin_alphabet = lower_base.join + upper_base.join
    target_alphabet = lower_rotated.join + upper_rotated.join

    # 4. Traducir instantáneamente el texto sustituyendo los caracteres
    text.tr(origin_alphabet, target_alphabet)
  end
end