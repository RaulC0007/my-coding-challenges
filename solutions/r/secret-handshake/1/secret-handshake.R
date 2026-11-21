handshake <- function(n) {
  actions <- c("wink", "double blink", "close your eyes", "jump")
  result <- c()
  
  # Evaluar cada uno de los primeros 4 bits (de derecha a izquierda)
  for (i in 1:4) {
    # Comprobar si el i-ésimo bit está activo usando operaciones a nivel de bits
    if (bitwAnd(n, bitwShiftL(1, i - 1)) != 0) {
      result <- c(result, actions[i])
    }
  }
  
  # Si el 5to bit (valor 16) está activo, revertir el orden de las acciones
  if (bitwAnd(n, 16) != 0) {
    result <- rev(result)
  }
  
  return(result)
}