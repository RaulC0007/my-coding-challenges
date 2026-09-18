library(lubridate)

# 1. Parse all-number appointment date
schedule_appointment <- function(appointment) {
  # Parse the US-style date string and set the timezone to UTC
  mdy_hms(appointment, tz = "UTC")
}

# 2. Check if an appointment has already passed
has_passed <- function(appointment) {
  # Compare the appointment time to the current UTC time
  appointment < now(tz = "UTC")
}

# 3. Check if appointment is in the afternoon
is_afternoon_appointment <- function(appointment) {
  # Extract the hour and check if it's between 12:00 (inclusive) and 18:00 (exclusive)
  hour(appointment) >= 12 & hour(appointment) < 18
}

# 4. Check the day of the week for an appointment
day_of_week <- function(appointment) {
  # Return the day of the week as an integer, with Monday as 1
  wday(appointment, week_start = 1)
}

# 5. Reschedule an appointment
reschedule <- function(appointment) {
  # Parse the input string to a datetime object
  appt <- mdy_hms(appointment, tz = "UTC")
  
  # Get the current day of the week (1 = Monday, 7 = Sunday)
  current_wday <- wday(appt, week_start = 1)
  
  # If it's Friday (5), Saturday (6), or Sunday (7), push to next Friday
  if (current_wday >= 5) {
    appt + days(5 - current_wday + 7)
  } else {
    # If it's Monday (1) through Thursday (4), push to this Friday
    appt + days(5 - current_wday)
  }
}