scale <- function(point, s) {
  # Multiply each coordinate by its corresponding scaling factor
  # s can be a single value or a vector of the same length as point
  point * s
}

translate <- function(point, ...) {
  # Get the translation values as a vector
  translations <- c(...)
  
  # Add the translations to the point (element-wise)
  point + translations
}

transform2d <- function(dx, dy, s = 1) {
  # Return a function that performs translation then scaling on a 2D point
  function(point) {
    # First translate
    translated <- point + c(dx, dy)
    # Then scale
    translated * s
  }
}

transform3d <- function(dx, dy, dz, s = 1) {
  # Return a function that performs translation then scaling on a 3D point
  function(point) {
    # First translate
    translated <- point + c(dx, dy, dz)
    # Then scale
    translated * s
  }
}