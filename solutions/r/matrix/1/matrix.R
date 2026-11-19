matrix_row <- function(input, row_idx) {
  # Split the input string into individual rows by newline
  rows <- strsplit(input, "\n")[[1]]
  
  # Extract the specific row, split it by space, and convert to integers
  as.integer(strsplit(rows[row_idx], " ")[[1]])
}

matrix_col <- function(input, col_idx) {
  # Split the input string into individual rows by newline
  rows <- strsplit(input, "\n")[[1]]
  
  # Use vapply to extract the column, and unname() to remove the auto-generated names
  unname(vapply(rows, function(row) {
    as.integer(strsplit(row, " ")[[1]])[col_idx]
  }, integer(1)))
}