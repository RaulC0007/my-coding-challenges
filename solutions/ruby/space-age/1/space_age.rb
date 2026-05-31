class SpaceAge
  EARTH_YEAR_SECONDS = 31_557_600.0
  
  PLANET_RATIOS = {
    mercury: 0.2408467,
    venus:   0.61519726,
    earth:   1.0,
    mars:    1.8808158,
    jupiter: 11.862615,
    saturn:  29.447498,
    uranus:  84.016846,
    neptune: 164.79132
  }

  def initialize(seconds)
    @seconds = seconds.to_f
  end

  # Generamos dinámicamente métodos como: on_mercury, on_venus, etc.
  PLANET_RATIOS.each do |planet, ratio|
    define_method("on_#{planet}") do
      @seconds / (EARTH_YEAR_SECONDS * ratio)
    end
  end
end