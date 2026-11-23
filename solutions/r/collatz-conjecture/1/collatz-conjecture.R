collatz_step_counter <- function(num) {
  # Validar que la entrada sea numérica y positiva
  if (!is.numeric(num) || any(num <= 0) || any(num != floor(num))) {
    stop("Only positive integers are allowed")
  }
  
  # Función auxiliar para calcular los pasos de un solo número
  calc_steps <- function(n) {
    steps <- 0
    while (n > 1) {
      if (n %% 2 == 0) {
        n <- n / 2
      } else {
        n <- 3 * n + 1
      }
      steps <- steps + 1
    }
    return(steps)
  }
  
  # Aplicar la función a cada elemento del vector de entrada
  sapply(num, calc_steps)
}