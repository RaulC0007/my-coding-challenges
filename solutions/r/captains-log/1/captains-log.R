random_planet_class <- function(number_needed) {
  # List of all possible planetary classes
  classes <- c("D", "H", "J", "K", "L", "M", "N", "R", "T", "Y")
  # Sample with replacement (duplicates allowed)
  sample(classes, number_needed, replace = TRUE)
}

random_ship_registry_number <- function() {
  # Generate a random number between 1000 and 9999
  number <- sample(1000:9999, 1)
  # Return the formatted registry number
  paste0("NCC-", number)
}

shuffle_starships <- function(starships) {
  # Sample all starships without replacement (shuffle)
  sample(starships)
}

random_stardate <- function() {
  # Generate a random floating point number between 41000.0 and 42000.0
  runif(1, min = 41000, max = 42000)
}