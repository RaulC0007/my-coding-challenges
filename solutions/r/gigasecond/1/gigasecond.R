library(lubridate)

add_gigasecond <- function(moment) {
  # Add one gigasecond (1,000,000,000 seconds) to the moment
  moment + seconds(1000000000)
}