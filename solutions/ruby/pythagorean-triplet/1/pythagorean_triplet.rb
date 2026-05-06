class PythagoreanTriplet
  def self.triplets_with_sum(sum)
    triplets = []
    
    # a must be less than sum/3 since a < b < c
    (1...sum / 3).each do |a|
      # From a² + b² = c² and a + b + c = sum:
      # c = sum - a - b
      # Substituting and solving for b:
      # b = sum(sum - 2a) / 2(sum - a)
      
      numerator = sum * (sum - 2 * a)
      denominator = 2 * (sum - a)
      
      next if numerator % denominator != 0
      
      b = numerator / denominator
      c = sum - a - b
      
      # Validate: a < b < c and Pythagorean theorem holds
      if b > a && c > b && a**2 + b**2 == c**2
        triplets << [a, b, c]
      end
    end
    
    triplets
  end
end