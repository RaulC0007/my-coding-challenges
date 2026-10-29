value <- function(resistor_colors) {
  colors <- c(
    "black", "brown", "red", "orange", "yellow",
    "green", "blue", "violet", "grey", "white"
  )
  
  # Tomamos los primeros dos colores y obtenemos sus valores numéricos (base 0)
  val1 <- match(resistor_colors[1], colors) - 1
  val2 <- match(resistor_colors[2], colors) - 1
  
  # Combinamos los dos dígitos
  return(val1 * 10 + val2)
}