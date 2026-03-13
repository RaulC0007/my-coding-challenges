class AssemblyLine
  CARS_PER_HOUR_AT_SPEED_1 = 221.0

  def initialize(speed)
    @speed = speed
  end

  def production_rate_per_hour
    base_rate = @speed * CARS_PER_HOUR_AT_SPEED_1
    success_rate = case @speed
                   when 1..4   then 1.0
                   when 5..8   then 0.9
                   when 9      then 0.8
                   when 10     then 0.77
                   else             0.0   # speed 0 or invalid
                   end

    base_rate * success_rate
  end

  def working_items_per_minute
    # Convert hourly production to per-minute, then floor to integer
    (production_rate_per_hour / 60).floor
  end
end