recite <- function(wanted) {
  if (length(wanted) == 0) {
    return(NULL)
  }
  
  lines <- character(length(wanted))
  
  for (i in seq_len(length(wanted) - 1)) {
    lines[i] <- sprintf("For want of a %s the %s was lost.", wanted[i], wanted[i + 1])
  }
  
  lines[length(wanted)] <- sprintf("And all for the want of a %s.", wanted[1])
  
  return(lines)
}