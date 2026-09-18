create <- function(row, col) {
  if (row < 0 || row > 7 || col < 0 || col > 7) {
    stop("Position must be on the 8x8 chessboard (0-7).")
  }
  c(row = row, col = col)
}

can_attack <- function(queen1, queen2) {
  if (all(queen1 == queen2)) {
    stop("Queens cannot occupy the same position.")
  }
  
  # Same row or same column
  if (queen1["row"] == queen2["row"] || queen1["col"] == queen2["col"]) {
    return(TRUE)
  }
  
  # Same diagonal (absolute difference in rows equals absolute difference in columns)
  if (abs(queen1["row"] - queen2["row"]) == abs(queen1["col"] - queen2["col"])) {
    return(TRUE)
  }
  
  return(FALSE)
}