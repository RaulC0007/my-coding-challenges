square_root <- function(number) {
  if (number < 0) {
    stop("Square root is not defined for negative numbers.")
  }
  
  low <- 1
  high <- number
  
  # Handle special case for 0
  if (number == 0) {
    return(0)
  }
  
  while (low <= high) {
    mid <- low + (high - low) %/% 2
    sq <- mid * mid
    
    if (sq == number) {
      return(mid)
    } else if (sq < number) {
      low <- mid + 1
    } else {
      high <- mid - 1
    }
  }
}