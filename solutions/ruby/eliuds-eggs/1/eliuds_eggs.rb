class EliudsEggs
  # Cambiamos el nombre de 'count' a 'egg_count'
  def self.egg_count(number)
    # Tu lógica original es excelente:
    # 1. Convertimos a binario: 89 -> "1011001"
    # 2. Separamos caracteres: ["1", "0", "1", "1", "0", "0", "1"]
    # 3. Contamos los unos: 4
    number.to_s(2).chars.count('1')
  end
end