class Clock
  attr_reader :total_minutes

  MINUTES_IN_DAY = 1440
  MINUTES_IN_HOUR = 60

  def initialize(hour: 0, minute: 0)
    # Convertimos todo a minutos y aplicamos módulo para normalizar
    @total_minutes = (hour * MINUTES_IN_HOUR + minute) % MINUTES_IN_DAY
  end

  def to_s
    # Formateamos con ceros a la izquierda (00:00)
    # %02d significa: entero, de 2 dígitos, rellenar con cero
    format('%02d:%02d', hour, minute)
  end

  def +(other_clock)
    Clock.new(minute: total_minutes + other_clock.total_minutes)
  end

  def -(other_clock)
    Clock.new(minute: total_minutes - other_clock.total_minutes)
  end

  def ==(other)
    # Comparamos si el otro objeto es un Clock y si tienen los mismos minutos
    other.is_a?(Clock) && total_minutes == other.total_minutes
  end

  private

  def hour
    (total_minutes / MINUTES_IN_HOUR) % 24
  end

  def minute
    total_minutes % MINUTES_IN_HOUR
  end
end