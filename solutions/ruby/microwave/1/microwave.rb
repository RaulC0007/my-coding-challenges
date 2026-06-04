class Microwave
  def initialize(buttons)
    @buttons = buttons
  end

  def timer
    # 1. Extraemos los minutos y segundos crudos según su posición digital
    raw_minutes = @buttons / 100
    raw_seconds = @buttons % 100

    # 2. Rebalanceamos los segundos si superan el límite de 59
    total_minutes = raw_minutes + (raw_seconds / 60)
    total_seconds = raw_seconds % 60

    # 3. Formateamos a formato "MM:SS" asegurando dos dígitos por sección
    sprintf('%02d:%02d', total_minutes, total_seconds)
  end
end