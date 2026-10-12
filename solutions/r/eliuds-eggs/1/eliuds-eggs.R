egg_count <- function(display_value) {
  count <- 0
  while (display_value > 0) {
    if (display_value %% 2 == 1) {
      count <- count + 1
    }
    display_value <- floor(display_value / 2)
  }
  return(count)
}