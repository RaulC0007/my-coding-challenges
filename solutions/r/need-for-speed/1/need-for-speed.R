new_car <- function(speed, battery_drain) {
  list(
    speed = speed,
    battery_drain = battery_drain,
    battery = 100,
    distance_traveled = 0
  )
}

new_track <- function(track_length) {
  list(
    track_length = track_length
  )
}

battery_drained <- function(car) {
  # Battery is drained if there's not enough to drive one more time
  car$battery < car$battery_drain
}

drive <- function(car) {
  # If the battery is drained, the car doesn't move
  if (battery_drained(car)) {
    return(car)
  }
  
  # Drive the car: increase distance, decrease battery
  car$distance_traveled <- car$distance_traveled + car$speed
  car$battery <- car$battery - car$battery_drain
  
  return(car)
}

can_finish <- function(car, track) {
  # Calculate how many times the car can drive before battery is drained
  max_drives <- car$battery %/% car$battery_drain
  
  # Calculate the maximum distance the car can cover
  max_distance <- max_drives * car$speed
  
  # Check if the car can cover the track distance
  return(max_distance >= track$track_length)
}

store_track <- function(car, track, name) {
  # Reset the car to full battery and zero distance
  car$battery <- 100
  car$distance_traveled <- 0
  
  # Determine if the car can finish the track
  can_complete <- can_finish(car, track)
  
  # Create the track sub-list
  track_info <- list(
    track_length = track$track_length,
    complete = can_complete
  )
  
  # Add the track info to the car using the track name
  car[[name]] <- track_info
  
  return(car)
}