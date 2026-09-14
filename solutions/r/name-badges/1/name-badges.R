print_name_badge <- function(id, name, department) {
  # Handle department (NULL means owner)
  if (is.null(department)) {
    dept <- "OWNER"
  } else {
    dept <- toupper(department)
  }
  
  # Handle ID (NA means new employee without ID)
  if (is.na(id)) {
    return(paste(name, "-", dept))
  } else {
    return(paste0("[", id, "] - ", name, " - ", dept))
  }
}

salaries_no_id <- function(ids, salaries) {
  # Sum salaries where ID is missing (NA)
  total <- sum(salaries[is.na(ids)])
  
  # If no matching salaries, sum() returns 0 (numeric(0) sums to 0)
  return(total)
}