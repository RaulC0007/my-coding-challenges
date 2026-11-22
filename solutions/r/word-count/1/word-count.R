library(stringr)

word_count <- function(input) {
  # 1. Convert to lowercase for case-insensitive counting
  lower_input <- str_to_lower(input)
  
  # 2. Split on any character that is not a letter, digit, or apostrophe
  words <- str_split(lower_input, "[^a-z0-9']+")[[1]]
  
  # 3. Remove empty strings and trim leading/trailing apostrophes from each word
  # Esto elimina comillas simples sueltas o envolventes (ej. "'first" -> "first", "'three'" -> "three")
  words <- gsub("^'+|'+$", "", words)
  words <- words[words != ""]
  
  # 4. Count occurrences using table() and convert to a named list
  counts <- table(words)
  
  result <- as.list(counts)
  names(result) <- names(counts)
  
  return(result)
}
