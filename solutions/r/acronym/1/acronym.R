library(stringr)

acronym <- function(input) {
  # Replace hyphens with spaces (hyphens are word separators)
  input <- str_replace_all(input, "-", " ")
  
  # Remove all non-alphabetic characters except spaces
  input <- str_replace_all(input, "[^a-zA-Z ]", "")
  
  # Split into words, take first letter of each, convert to uppercase
  words <- str_split(input, "\\s+")[[1]]
  words <- words[words != ""]  # Remove empty strings
  
  # Get the first letter of each word and collapse into a single string
  paste0(toupper(str_sub(words, 1, 1)), collapse = "")
}