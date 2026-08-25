difference_of_squares <- function(natural_number) {
  # Sum of first n natural numbers: n * (n + 1) / 2
  sum_numbers <- natural_number * (natural_number + 1) / 2
  
  # Square of the sum
  square_of_sum <- sum_numbers^2
  
  # Sum of squares of first n natural numbers: n * (n + 1) * (2n + 1) / 6
  sum_of_squares <- natural_number * (natural_number + 1) * (2 * natural_number + 1) / 6
  
  # Return the difference
  square_of_sum - sum_of_squares
}