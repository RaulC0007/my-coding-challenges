class Poker
  def initialize(hands)
    @hands = hands
  end

  def best_hand
    # Agrupamos las manos según su valor de puntuación calculado
    ranked_hands = @hands.group_by { |hand| score_hand(hand) }
    max_score = ranked_hands.keys.max
    ranked_hands[max_score]
  end

  private

  # Mapeo de valores de cartas a enteros comparables
  CARD_VALUES = {
    '2'=>2, '3'=>3, '4'=>4, '5'=>5, '6'=>6, '7'=>7, '8'=>8, '9'=>9,
    '10'=>10, 'J'=>11, 'Q'=>12, 'K'=>13, 'A'=>14
  }.freeze

  def score_hand(hand)
    # AJUSTE: Si 'hand' ya es un Array, lo usamos directamente. Si es String, le hacemos split.
    cards_array = hand.is_a?(String) ? hand.split : hand

    # Parseamos cada carta: el valor y el palo
    cards = cards_array.map do |c|
      rank = c[0...-1]
      suit = c[-1]
      [CARD_VALUES[rank], suit]
    end

    values = cards.map { |v, _| v }.sort.reverse
    suits = cards.map { |_, s| s }

    is_flush = suits.uniq.size == 1
    
    # Detección de Escalera (incluye el caso especial de la rueda/wheel: 5 4 3 2 A)
    is_straight = false
    if values.uniq.size == 5
      if values[0] - values[4] == 4
        is_straight = true
      elsif values == [14, 5, 4, 3, 2] # Escalera baja: As muta a valor 1
        is_straight = true
        values = [5, 4, 3, 2, 1]
      end
    end

    # Agrupamos valores por frecuencia para identificar parejas, tríos, etc.
    counts = values.group_by { |v| v }.transform_values(&:size)
    # Ordenamos de mayor frecuencia a menor, y en empates por valor numérico
    sorted_by_freq = counts.sort_by { |val, count| [-count, -val] }.map(&:first)
    freq_pattern = counts.values.sort.reverse

    # Retornamos un arreglo: [Categoría, cartas ordenadas por importancia]
    case
    when is_straight && is_flush then [8, values]          # Straight Flush
    when freq_pattern == [4, 1]    then [7, sorted_by_freq] # Four of a Kind
    when freq_pattern == [3, 2]    then [6, sorted_by_freq] # Full House
    when is_flush                   then [5, values]          # Flush
    when is_straight                then [4, values]          # Straight
    when freq_pattern == [3, 1, 1] then [3, sorted_by_freq] # Three of a Kind
    when freq_pattern == [2, 2, 1] then [2, sorted_by_freq] # Two Pair
    when freq_pattern == [2, 1, 1, 1] then [1, sorted_by_freq] # One Pair
    else [0, values]                                        # High Card
    end
  end
end