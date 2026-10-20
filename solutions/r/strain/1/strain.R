keep <- function(input, fun) {
  if (length(input) == 0) {
    return(input)
  }
  
  result <- list()
  for (item in input) {
    if (fun(item)) {
      result <- c(result, list(item))
    }
  }
  
  if (is.atomic(input)) {
    return(unlist(result))
  }
  return(result)
}

discard <- function(input, fun) {
  if (length(input) == 0) {
    return(input)
  }
  
  result <- list()
  for (item in input) {
    if (!fun(item)) {
      result <- c(result, list(item))
    }
  }
  
  if (is.atomic(input)) {
    return(unlist(result))
  }
  return(result)
}