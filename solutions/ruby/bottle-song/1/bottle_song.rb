class BottleSong
  NUMBERS = {
    10 => 'ten', 9 => 'nine', 8 => 'eight', 7 => 'seven', 6 => 'six',
    5 => 'five', 4 => 'four', 3 => 'three', 2 => 'two', 1 => 'one', 0 => 'no'
  }.freeze

  def self.recite(start_bottles, take_down)
    verses = start_bottles.downto(start_bottles - take_down + 1).map do |count|
      build_verse(count)
    end
    
    # Unimos los bloques con una doble línea y agregamos el salto final que exige el test
    verses.join("\n\n") + "\n"
  end

  private

  def self.build_verse(count)
    current_word = NUMBERS[count].capitalize
    next_word = NUMBERS[count - 1]

    current_plural = count == 1 ? 'bottle' : 'bottles'
    next_plural = (count - 1) == 1 ? 'bottle' : 'bottles'

    [
      "#{current_word} green #{current_plural} hanging on the wall,",
      "#{current_word} green #{current_plural} hanging on the wall,",
      "And if one green bottle should accidentally fall,",
      "There'll be #{next_word} green #{next_plural} hanging on the wall."
    ].join("\n")
  end
end