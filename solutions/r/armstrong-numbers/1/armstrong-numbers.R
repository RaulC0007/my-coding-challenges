is_armstrong_number <- function(n) {
  # Convert the number to a string to easily count and split the digits
  str_n <- as.character(n)
  
  # Split the string into individual characters and convert them to integers
  digits <- as.integer(strsplit(str_n, "")[[1]])
  
  # Raise each digit to the power of the total number of digits, 
  # sum them up, and check if it equals the original number
  sum(digits ^ nchar(str_n)) == n
}