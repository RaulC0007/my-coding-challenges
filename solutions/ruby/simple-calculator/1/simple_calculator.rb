class SimpleCalculator
  class UnsupportedOperation < StandardError; end

  ALLOWED_OPERATIONS = ['+', '*', '/'].freeze

  def self.calculate(first_operand, second_operand, operation)
    # Validate operand types
    unless first_operand.is_a?(Numeric) && second_operand.is_a?(Numeric)
      raise ArgumentError, "Both operands must be numbers"
    end

    # Validate operation
    unless ALLOWED_OPERATIONS.include?(operation)
      raise UnsupportedOperation, "#{operation} is not a supported operation"
    end

    # Perform calculation
    begin
      result = case operation
               when '+' then first_operand + second_operand
               when '*' then first_operand * second_operand
               when '/' then first_operand / second_operand
               end

      "#{first_operand} #{operation} #{second_operand} = #{result}"
    rescue ZeroDivisionError
      "Division by zero is not allowed."
    end
  end
end