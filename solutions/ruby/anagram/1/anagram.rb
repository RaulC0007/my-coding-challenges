class Anagram
  def initialize(target_word)
    # Guardamos la palabra objetivo en minúsculas para comparaciones consistentes
    @target = target_word.downcase
    # Pre-calculamos la versión ordenada de la palabra objetivo para ahorrar recursos
    @target_sorted = sort_chars(@target)
  end

  def match(candidates)
    # .select filtra la lista y devuelve solo los que cumplen el bloque
    candidates.select do |candidate|
      current_candidate = candidate.downcase
      
      # Regla 1: No puede ser la misma palabra
      # Regla 2: Deben tener las mismas letras (ordenadas coinciden)
      current_candidate != @target && sort_chars(current_candidate) == @target_sorted
    end
  end

  private

  # Método auxiliar para convertir una palabra en un arreglo ordenado de letras
  def sort_chars(word)
    word.chars.sort
  end
end