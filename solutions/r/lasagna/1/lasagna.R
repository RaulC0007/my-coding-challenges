# Define the expected oven time in minutes
expected_minutes_in_oven <- function() {
  60
}

# Calculate the remaining oven time in minutes
remaining_time_in_minutes <- function(actual_minutes) {
  expected_minutes_in_oven() - actual_minutes
}

# Calculate the preparation time in minutes
prep_time_in_minutes <- function(number_of_layers) {
  number_of_layers * 2
}

# Calculate the elapsed time in minutes
elapsed_time_in_minutes <- function(number_of_layers, actual_minutes_in_oven) {
  prep_time_in_minutes(number_of_layers) + actual_minutes_in_oven
}