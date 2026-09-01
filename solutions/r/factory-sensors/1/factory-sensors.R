check_humidity_level <- function(pct_humidity) {
  # Throw an error if humidity exceeds 70%
  stopifnot(pct_humidity <= 70)
  
  # If we get here, the test passed
  message("humidity test passed")
  return(TRUE)
}

report_overheating <- function(temperature) {
  # Check if the sensor is broken (temperature is NULL)
  if (is.null(temperature)) {
    stop("Sensor Broken")
  }
  
  # Check for dangerous overheating (> 600°C)
  if (temperature > 600) {
    stop(paste("Overheating:", temperature, "C"))
  }
  
  # Check for mild overheating (> 500°C)
  if (temperature > 500) {
    warning(paste("Risk of overheating:", temperature, "C"))
    return(FALSE)
  }
  
  # All is well
  message(paste("temperature check passed:", temperature, "°C"))
  return(TRUE)
}

monitor_the_machine <- function(pct_humidity, temperature) {
  # Check humidity first
  check_humidity_level(pct_humidity)
  
  # Check temperature
  report_overheating(temperature)
  
  # If we get here, both checks passed
  message("All OK!")
}