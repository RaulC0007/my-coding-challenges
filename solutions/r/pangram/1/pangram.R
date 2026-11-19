is_pangram <- function(input) {
  # Convert the string to lowercase and split it into individual characters
  chars <- strsplit(tolower(input), "")[[1]]
  
  # R has a built-in constant 'letters' containing "a" through "z".
  # setdiff() returns the letters that are missing from our character list.
  # If the number of missing letters is 0, it's a pangram!
  length(setdiff(letters, chars)) == 0
}