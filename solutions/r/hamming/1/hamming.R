hamming <- function(strand1, strand2) {
  # Check if the strands have the same length
  if (nchar(strand1) != nchar(strand2)) {
    stop("strands must be of equal length")
  }
  
  # Split the strings into individual characters
  chars1 <- strsplit(strand1, "")[[1]]
  chars2 <- strsplit(strand2, "")[[1]]
  
  # Count the number of differences
  sum(chars1 != chars2)
}