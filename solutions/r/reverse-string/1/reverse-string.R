library(stringr)

reverse <- function(text) {
  # Check if grapheme clusters are enabled (if the variable exists in the parent environment and is TRUE)
  use_graphemes <- exists("enable_grapheme_clusters") && get("enable_grapheme_clusters")
  
  if (use_graphemes) {
    # Split by grapheme clusters using stringr/stringi functionality
    clusters <- str_split(text, "", simplify = FALSE)[[1]]
    paste0(rev(clusters), collapse = "")
  } else {
    # Standard character-by-character reversal
    chars <- unlist(strsplit(text, NULL))
    paste0(rev(chars), collapse = "")
  }
}