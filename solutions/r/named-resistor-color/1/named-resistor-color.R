resistor_bands <- c(
  black = 0,
  brown = 1,
  red = 2,
  orange = 3,
  yellow = 4,
  green = 5,
  blue = 6,
  violet = 7,
  grey = 8,
  white = 9
)

band_value <- function(band) {
  unname(resistor_bands[band])
}

two_band_value <- function(bands) {
  m <- band_value(bands[1])
  n <- band_value(bands[2])
  m * 10 + n
}

ohms <- function(bands) {
  value <- two_band_value(bands[1:2])
  multiplier <- band_value(bands[3])
  value * 10 ^ multiplier
}