class InvalidCodonError < ArgumentError; end

class Translation
  CODON_MAP = {
    'AUG' => 'Methionine',
    'UUU' => 'Phenylalanine', 'UUC' => 'Phenylalanine',
    'UUA' => 'Leucine',       'UUG' => 'Leucine',
    'UCU' => 'Serine',        'UCC' => 'Serine',        'UCA' => 'Serine', 'UCG' => 'Serine',
    'UAU' => 'Tyrosine',      'UAC' => 'Tyrosine',
    'UGU' => 'Cysteine',      'UGC' => 'Cysteine',
    'UGG' => 'Tryptophan',
    'UAA' => 'STOP',          'UAG' => 'STOP',          'UGA' => 'STOP'
  }.freeze

  def self.of_rna(strand)
    proteins = []
    stopped = false

    # Escaneamos de 3 en 3 caracteres
    strand.scan(/.../).each do |codon|
      raise InvalidCodonError, "Invalid codon: #{codon}" unless CODON_MAP.key?(codon)

      protein = CODON_MAP[codon]
      if protein == 'STOP'
        stopped = true
        break
      end

      proteins << protein
    end

    # Si la cadena no es múltiplo de 3 (quedaron letras colgando)
    # y el bucle NO se detuvo por un STOP previo, la secuencia es inválida.
    if strand.length % 3 != 0 && !stopped
      raise InvalidCodonError, "Incomplete RNA sequence"
    end

    proteins
  end
end