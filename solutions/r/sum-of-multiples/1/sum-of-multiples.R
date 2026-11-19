sum_of_multiples <- function(factors, limit) {
  # Filter out 0 and any factors that are >= limit
  valid_factors <- factors[factors > 0 & factors < limit]
  
  # If there are no valid factors, the sum is 0
  if (length(valid_factors) == 0) {
    return(0)
  }
  
  # Generate the multiples for each valid factor
  multiples <- unlist(lapply(valid_factors, function(f) {
    seq(f, limit - 1, by = f)
  }))
  
  # Remove duplicates and calculate the sum
  sum(unique(multiples))
}