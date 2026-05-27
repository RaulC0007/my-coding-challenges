class PigLatin
  def self.translate(phrase)
    # Dividimos la frase por espacios para poder traducir palabra por palabra
    phrase.split(' ').map { |word| translate_word(word) }.join(' ')
  end

  private

  def self.translate_word(word)
    # Regla 1: Empieza con sonido de vocal (vocal directa, xr o yt)
    if word =~ /^[aeiou]/ || word =~ /^(xr|yt)/
      return word + "ay"
    end

    # Regla 3: Consonantes opcionales seguidas de 'qu' (ej: "quick", "square")
    if match = word.match(/^([^aeiou]*qu)(.*)/)
      return match[2] + match[1] + "ay"
    end

    # Regla 4: Una o más consonantes seguidas de 'y' (ej: "my", "rhythm")
    if match = word.match(/^([^aeiou]+)(y.*)/)
      return match[2] + match[1] + "ay"
    end

    # Regla 2: Consonantes genéricas al inicio (ej: "pig", "chair")
    if match = word.match(/^([^aeiou]+)(.*)/)
      return match[2] + match[1] + "ay"
    end

    word
  end
end