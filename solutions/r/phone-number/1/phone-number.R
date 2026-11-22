parse_phone_number <- function(number_string) {
  # 1. Extraer solo los dígitos de la cadena
  digits <- gsub("\\D", "", number_string)
  
  # 2. Si tiene 11 dígitos y empieza por '1', remover el código de país
  if (nchar(digits) == 11) {
    if (substr(digits, 1, 1) == "1") {
      digits <- substring(digits, 2)
    } else {
      return(NULL)
    }
  }
  
  # 3. El número limpio debe tener exactamente 10 dígitos
  if (nchar(digits) != 10) {
    return(NULL)
  }
  
  # 4. Validar reglas de los códigos de área e intercambio (NXX NXX-XXXX)
  area_code_first <- substr(digits, 1, 1)
  exchange_code_first <- substr(digits, 4, 4)
  
  if (area_code_first %in% c("0", "1") || exchange_code_first %in% c("0", "1")) {
    return(NULL)
  }
  
  return(digits)
}