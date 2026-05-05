class ResistorColorTrio
  COLORS = %w[black brown red orange yellow green blue violet grey white].freeze
  
  # Definimos las unidades en potencias de 1000
  UNITS = %w[ohms kiloohms megaohms gigaohms].freeze

  def initialize(colors)
    @colors = colors
  end

  def label
    # 1. Obtener valores numéricos de las bandas
    v1 = COLORS.index(@colors[0])
    v2 = COLORS.index(@colors[1])
    exponent = COLORS.index(@colors[2])

    # 2. Calcular valor base en ohms
    value = (v1 * 10 + v2) * (10**exponent)

    # 3. Escalar el valor y la unidad
    unit_index = 0
    # Mientras el valor sea mayor o igual a 1000 y tengamos más unidades
    while value >= 1000 && unit_index < UNITS.length - 1
      value /= 1000
      unit_index += 1
    end

    "Resistor value: #{value} #{UNITS[unit_index]}"
  end
end