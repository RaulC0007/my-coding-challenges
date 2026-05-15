class ResistorColorDuo
  COLOR_CODES = {
    "black"  => 0,
    "brown"  => 1,
    "red"    => 2,
    "orange" => 3,
    "yellow" => 4,
    "green"  => 5,
    "blue"   => 6,
    "violet" => 7,
    "grey"   => 8,
    "white"  => 9
  }.freeze

  def self.value(colors)
    # Take only the first two colors
    first = COLOR_CODES[colors[0]]
    second = COLOR_CODES[colors[1]]

    # Combine into a two-digit number: 10 * first + second
    first * 10 + second
  end
end