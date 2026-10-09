simplex <- function(a, b) {
  # Create a complex number a + bi
  complex(real = a, imaginary = b)
}

driver_directions <- function(start, end) {
  # Direction from start to end
  end - start
}

manhattan <- function(start, end) {
  # Manhattan distance (L1 norm): |real_diff| + |imag_diff|
  direction <- end - start
  abs(Re(direction)) + abs(Im(direction))
}

as_crow_flies <- function(start, end) {
  # Euclidean distance: |end - start|
  abs(end - start)
}

crow_directions <- function(start, end) {
  # Same as driver directions but with north/south flipped (imaginary sign flipped)
  direction <- end - start
  # Flip the imaginary part using Conj()
  Conj(direction)
}