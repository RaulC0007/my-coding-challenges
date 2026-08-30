today <- function(birds_per_day) {
  # Return the last element (today's count)
  birds_per_day[length(birds_per_day)]
}

increment_todays_count <- function(birds_per_day) {
  # Increment the last element by 1
  birds_per_day[length(birds_per_day)] <- birds_per_day[length(birds_per_day)] + 1
  birds_per_day
}

has_day_without_birds <- function(birds_per_day) {
  # Check if any day had 0 birds
  any(birds_per_day == 0)
}

count_for_first_days <- function(birds_per_day, num_days) {
  # Sum the first num_days elements
  sum(birds_per_day[1:num_days])
}

busy_days <- function(birds_per_day) {
  # Count days with 5 or more birds
  sum(birds_per_day >= 5)
}

running_total <- function(birds_per_day) {
  # Calculate cumulative sum
  cumsum(birds_per_day)
}

busy_days_of_week <- function(birds_per_day, day_names) {
  # Sort day names by bird count in descending order
  day_names[order(birds_per_day, decreasing = TRUE)]
}