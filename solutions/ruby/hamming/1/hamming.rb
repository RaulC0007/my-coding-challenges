class Hamming
  def self.compute(strand1, strand2)
    # 1. Validación: las hebras deben tener la misma longitud
    if strand1.length != strand2.length
      raise ArgumentError, "Strands must be of equal length"
    end

    # 2. Convertimos el primer string a caracteres
    # 3. Usamos 'zip' para emparejarlos con el segundo string
    # 4. Contamos cuántas parejas (a, b) son distintas
    strand1.chars.zip(strand2.chars).count do |char1, char2|
      char1 != char2
    end
  end
end