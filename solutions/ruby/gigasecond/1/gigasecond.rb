class Gigasecond
  # Usamos el guion bajo para hacer el número más legible (Ruby lo ignora)
  GIGASECOND = 1_000_000_000

  def self.from(start_time)
    # En Ruby, sumar a un objeto Time suma segundos automáticamente
    start_time + GIGASECOND
  end
end