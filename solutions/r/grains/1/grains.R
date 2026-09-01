square <- function(n) {
  if (n < 1 || n > 64) {
    stop("square must be between 1 and 64")
  }
  2^(n - 1)
}

total <- function() {
  2^64 - 1
}