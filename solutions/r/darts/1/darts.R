score <- function(x, y) {
  # Calculate the distance from the center using the Pythagorean theorem
  distance <- sqrt(x^2 + y^2)
  
  # Determine the score based on the distance
  if (distance > 10) {
    # Outside the outer circle (radius 10)
    return(0)
  } else if (distance > 5) {
    # In the outer circle (radius 10, but outside middle circle radius 5)
    return(1)
  } else if (distance > 1) {
    # In the middle circle (radius 5, but outside inner circle radius 1)
    return(5)
  } else {
    # In the inner circle (radius 1) - bullseye
    return(10)
  }
}