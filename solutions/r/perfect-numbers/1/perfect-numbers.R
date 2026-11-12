number_type <- function(n) {
  # Validar que la entrada sea un entero positivo válido
  if (!is.numeric(n) || length(n) != 1 || n <= 0 || n != floor(n)) {
    stop("Classification is only possible for positive integers.")
  }
  
  # Si el número es 1, su suma alícuota es 0 (deficiente)
  if (n == 1) {
    return("deficient")
  }
  
  # Encontrar todos los divisores menores que n de forma precisa
  # Probamos desde 1 hasta la raíz cuadrada de n
  divs <- c()
  limit <- floor(sqrt(n))
  
  for (i in 1:limit) {
    if (n %% i == 0) {
      divs <- c(divs, i)
      other <- n / i
      # Si el divisor complementario es diferente de n y de i, lo agregamos
      if (other != n && other != i) {
        divs <- c(divs, other)
      }
    }
  }
  
  # Calcular la suma alícuota sumando todos los factores encontrados menores que n
  aliquot_sum <- sum(divs)
  
  # Clasificar el número según Nicómaco
  if (aliquot_sum == n) {
    return("perfect")
  } else if (aliquot_sum > n) {
    return("abundant")
  } else {
    return("deficient")
  }
}