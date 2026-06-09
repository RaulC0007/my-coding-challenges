class Yacht
  def initialize(dice, category)
    @dice = dice
    @category = category
  end

  def score
    counts = @dice.tally

    case @category
    when 'ones'   then count_single(1)
    when 'twos'   then count_single(2)
    when 'threes' then count_single(3)
    when 'fours'  then count_single(4)
    when 'fives'  then count_single(5)
    when 'sixes'  then count_single(6)
    
    when 'full house'
      # Un Full House necesita que los dados agrupados tengan exactamente las frecuencias 3 y 2
      counts.values.sort == [2, 3] ? @dice.sum : 0

    when 'four of a kind'
      # Buscamos si alguna cara se repite 4 o 5 veces
      four_of_a_kind_face = counts.find { |_, v| v >= 4 }&.first
      four_of_a_kind_face ? four_of_a_kind_face * 4 : 0

    when 'little straight'
      @dice.sort == [1, 2, 3, 4, 5] ? 30 : 0

    when 'big straight'
      @dice.sort == [2, 3, 4, 5, 6] ? 30 : 0

    when 'choice'
      @dice.sum

    when 'yacht'
      # Yacht requiere que las 5 frecuencias apunten a una sola cara (frecuencia [5])
      counts.values == [5] ? 50 : 0

    else
      0
    end
  end

  private

  # Método auxiliar para las categorías numéricas simples (ones, twos, etc.)
  def count_single(target)
    @dice.count(target) * target
  end
end