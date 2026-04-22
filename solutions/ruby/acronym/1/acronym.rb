module Acronym
  def self.abbreviate(phrase)
    phrase
      .gsub(/[^A-Za-z\s-]/, '') # Solo permitimos letras, espacios y guiones
      .split(/[\s-]+/)
      .reject(&:empty?)
      .map { |word| word[0].upcase }
      .join
  end
end