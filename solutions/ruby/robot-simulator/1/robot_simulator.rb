class Robot
  DIRECTIONS = [:north, :east, :south, :west].freeze

  attr_reader :bearing, :coordinates

  def initialize
    @bearing = :north
    @coordinates = [0, 0]
  end

  def orient(direction)
    raise ArgumentError, "Invalid direction" unless DIRECTIONS.include?(direction)
    @bearing = direction
  end

  def at(x, y)
    @coordinates = [x, y]
  end

  def turn_right
    current_index = DIRECTIONS.index(@bearing)
    @bearing = DIRECTIONS[(current_index + 1) % 4]
  end

  def turn_left
    current_index = DIRECTIONS.index(@bearing)
    @bearing = DIRECTIONS[(current_index - 1) % 4]
  end

  def advance
    x, y = @coordinates
    case @bearing
    when :north then y += 1
    when :east  then x += 1
    when :south then y -= 1
    when :west  then x -= 1
    end
    @coordinates = [x, y]
  end
end

class RobotSimulator
  INSTRUCTIONS = {
    'R' => :turn_right,
    'L' => :turn_left,
    'A' => :advance
  }.freeze

  def instructions(string)
    string.chars.map { |char| INSTRUCTIONS[char] }
  end

  def place(robot, x:, y:, direction:)
    robot.at(x, y)
    robot.orient(direction)
  end

  def evaluate(robot, string)
    instructions(string).each do |command|
      robot.send(command)
    end
  end
end

# ESTA LINEA SALVA LOS TESTS:
Simulator = RobotSimulator