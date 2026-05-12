class PerfectNumber
  def self.classify(number)
    # El mensaje debe ser EXACTAMENTE el que espera el test
    raise ArgumentError, 'Classification is only possible for positive integers.' if number < 1
    
    return 'deficient' if number == 1

    sum = 1 
    sqrt_n = Math.sqrt(number).to_i

    (2..sqrt_n).each do |i|
      if number % i == 0
        sum += i
        complement = number / i
        sum += complement if complement != i
      end
    end

    if sum == number
      'perfect'
    elsif sum > number
      'abundant'
    else
      'deficient'
    end
  end
end