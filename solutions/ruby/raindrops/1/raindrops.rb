class Raindrops
  # Definimos los sonidos en una constante para mantener el código limpio
  SOUNDS = { 3 => "Pling", 5 => "Plang", 7 => "Plong" }

  def self.convert(number)
    # 1. Recorremos el diccionario y seleccionamos los sonidos si el número es divisible
    result = SOUNDS.map { |divisor, sound| sound if (number % divisor).zero? }.join

    # 2. Si result está vacío, devolvemos el número como string; si no, devolvemos result
    result.empty? ? number.to_s : result
  end
end