nucleotide_count <- function(input) {
  # Split the string into individual characters
  chars <- strsplit(input, "")[[1]]
  
  # Validate: check if any character is not A, C, G, or T
  if (any(!chars %in% c("A", "C", "G", "T"))) {
    stop("Invalid nucleotide in strand")
  }
  
  # Convert to a factor with explicit levels. 
  # This ensures that even if a nucleotide isn't present, it will still 
  # show up in the final count with a value of 0.
  f <- factor(chars, levels = c("A", "C", "G", "T"))
  
  # Count the occurrences and convert to a named list
  as.list(table(f))
}