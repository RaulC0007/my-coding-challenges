class Phrase
  def initialize(phrase)
    @phrase = phrase
  end

  def word_count
    # 1. Convertimos todo a minúsculas
    # 2. Usamos scan con una regex que busque:
    #    \b     -> Límite de palabra
    #    [\w']+ -> Uno o más caracteres de palabra (letras/números) o apóstrofes
    #    \b     -> Límite de palabra (esto descarta apóstrofes al inicio/final)
    words = @phrase.downcase.scan(/\b[\w']+\b/)

    # 3. Creamos un hash con valor inicial 0
    counts = Hash.new(0)

    # 4. Iteramos y sumamos
    words.each do |word|
      counts[word] += 1
    end

    counts
  end
end