class Game
  class BowlingError < StandardError; end

  def initialize
    @rolls = []
  end

  def roll(pins)
    raise BowlingError, 'Pins must have a value from 0 to 10' unless pins.between?(0, 10)
    raise BowlingError, 'Should not be able to roll after game is over' if game_over?

    # Clonamos momentáneamente para simular cómo quedaría el frame actual
    simulated_rolls = @rolls + [pins]
    frames = build_frames(simulated_rolls)
    
    # Validamos las reglas de los primeros 9 frames
    if frames.size <= 9
      current_frame = frames.last
      if current_frame && current_frame.size == 2 && current_frame.sum > 10
        raise BowlingError, 'Pin count exceeds pins on the lane'
      end
    # Validamos las reglas del décimo frame (incluyendo fill balls)
    elsif frames.size == 10
      tenth_frame = frames.last
      
      # Si los dos primeros tiros no suman un strike/spare, no pueden pasar de 10
      if tenth_frame.size == 2 && tenth_frame[0] != 10 && tenth_frame.sum > 10
        raise BowlingError, 'Pin count exceeds pins on the lane'
      end
      
      # Si el primero es strike pero el segundo no, el segundo y el tercero no pueden pasar de 10
      if tenth_frame.size == 3 && tenth_frame[0] == 10 && tenth_frame[1] != 10
        if tenth_frame[1] + tenth_frame[2] > 10
          raise BowlingError, 'Pin count exceeds pins on the lane'
        end
      end
    end

    @rolls << pins
  end

  def score
    raise BowlingError, 'Score cannot be taken until the end of the game' unless game_over?

    total_score = 0
    roll_index = 0

    10.times do
      if strike?(roll_index)
        total_score += 10 + strike_bonus(roll_index)
        roll_index += 1
      elsif spare?(roll_index)
        total_score += 10 + spare_bonus(roll_index)
        roll_index += 2
      else
        total_score += sum_of_balls_in_frame(roll_index)
        roll_index += 2
      end
    end

    total_score
  end

  private

  # Agrupa un arreglo plano de tiros en sus respectivos frames (1 al 10)
  def build_frames(rolls_to_group)
    frames = []
    current_rolls = rolls_to_group.dup

    while !current_rolls.empty? && frames.size < 9
      if current_rolls.first == 10
        frames << [current_rolls.shift] # Strike directo termina el frame
      else
        frames << current_rolls.shift(2) # Toma un par de tiros para el frame abierto/spare
      end
    end

    # Todo lo que sobre pertenece exclusivamente al décimo frame
    frames << current_rolls unless current_rolls.empty?
    frames
  end

  def game_over?
    frames = build_frames(@rolls)
    return false if frames.size < 10
    
    tenth_frame = frames[9]
    # Si el décimo frame empezó con Strike o sumó un Spare, requiere obligatoriamente 3 tiros
    if tenth_frame[0] == 10 || tenth_frame[0].to_i + tenth_frame[1].to_i == 10
      tenth_frame.size == 3
    else
      tenth_frame.size == 2
    end
  end

  def strike?(roll_index)
    @rolls[roll_index] == 10
  end

  def spare?(roll_index)
    @rolls[roll_index].to_i + @rolls[roll_index + 1].to_i == 10
  end

  def strike_bonus(roll_index)
    @rolls[roll_index + 1].to_i + @rolls[roll_index + 2].to_i
  end

  def spare_bonus(roll_index)
    @rolls[roll_index + 2].to_i
  end

  def sum_of_balls_in_frame(roll_index)
    @rolls[roll_index].to_i + @rolls[roll_index + 1].to_i
  end
end