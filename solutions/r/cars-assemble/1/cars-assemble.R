success_rate <- function(speed) {
  if (speed == 0) {
    0
  } else if (speed <= 4) {
    1.0
  } else if (speed <= 8) {
    0.9
  } else if (speed == 9) {
    0.8
  } else {  # speed == 10
    0.77
  }
}

production_rate_per_hour <- function(speed) {
  # Base production: speed * 221 cars per hour
  # Multiply by success rate to get working cars
  speed * 221 * success_rate(speed)
}

working_items_per_minute <- function(speed) {
  # Get production rate per hour, divide by 60 to get per minute
  # Use floor (or integer division) to get whole cars
  floor(production_rate_per_hour(speed) / 60)
}