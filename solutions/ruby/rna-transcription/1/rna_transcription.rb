class Complement
  # Definimos los caracteres de origen (DNA) y destino (RNA)
  DNA = 'GCTA'
  RNA = 'CGAU'

  def self.of_dna(strand)
    # tr mapea cada carácter de la primera cadena al carácter
    # correspondiente en la segunda cadena por su posición.
    strand.tr(DNA, RNA)
  end
end