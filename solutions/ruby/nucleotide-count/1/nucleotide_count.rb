class Nucleotide
  # Definimos los nucleótidos válidos para facilitar la validación
  VALID_NUCLEOTIDES = %w[A C G T].freeze

  def initialize(dna_string)
    @dna_string = dna_string
    validate!
  end

  # Método de clase para facilitar la llamada según el estándar de Exercism
  def self.from_dna(dna_string)
    new(dna_string)
  end

  def count(nucleotide)
    @dna_string.count(nucleotide)
  end

  def histogram
    # Creamos un hash inicial con ceros: {"A"=>0, "C"=>0, "G"=>0, "T"=>0}
    initial_histogram = { 'A' => 0, 'C' => 0, 'G' => 0, 'T' => 0 }
    
    # Recorremos la cadena y sumamos al histograma
    @dna_string.each_char.each_with_object(initial_histogram) do |char, hash|
      hash[char] += 1
    end
  end

  private

  # Verifica que no existan caracteres ilegales en la secuencia
  def validate!
    # Si la cadena contiene algo que NO sea A, C, G o T, lanzamos un error
    # El regex /[^ACGT]/ busca cualquier carácter fuera de ese set
    raise ArgumentError, "Secuencia de ADN inválida" if @dna_string.match?(/[^ACGT]/)
  end
end