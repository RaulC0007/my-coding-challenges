class Isogram
  def self.isogram?(phrase)
    # 1. Convertimos a minúsculas y extraemos solo las letras
    # Usamos scan(/[a-z]/) para ignorar espacios, números y guiones
    letters = phrase.downcase.scan(/[a-z]/)

    # 2. Comparamos el tamaño del arreglo original con el de sus elementos únicos
    # Si son iguales, no hay repeticiones (es un isograma)
    letters.length == letters.uniq.length
  end
end