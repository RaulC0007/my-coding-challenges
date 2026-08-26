raindrops <- function(number) {
  result <- ""
  
  # Check divisibility by 3
  if (number %% 3 == 0) {
    result <- paste0(result, "Pling")
  }
  
  # Check divisibility by 5
  if (number %% 5 == 0) {
    result <- paste0(result, "Plang")
  }
  
  # Check divisibility by 7
  if (number %% 7 == 0) {
    result <- paste0(result, "Plong")
  }
  
  # If no factors matched, return the number as a string
  if (result == "") {
    return(as.character(number))
  }
  
  return(result)
}