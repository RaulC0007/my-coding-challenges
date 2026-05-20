class SecretHandshake
  # Mapeamos los bits con sus respectivas acciones
  ACTIONS = {
    1 => "wink",
    2 => "double blink",
    4 => "close your eyes",
    8 => "jump"
  }.freeze

  def initialize(number)
    @number = number
  end

  def commands
    # Validamos que sea un entero antes de procesar por bits
    return [] unless @number.is_a?(Integer)

    handshake = []

    # Iteramos por cada par bit-acción de nuestra constante
    ACTIONS.each do |bit, action|
      # Si el bit está activo en @number, agregamos la acción
      handshake << action if (@number & bit) != 0
    end

    # El bit 16 (10000 en binario) dictamina si debemos invertir el orden
    handshake.reverse! if (@number & 16) != 0

    handshake
  end
end