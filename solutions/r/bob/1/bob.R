bob <- function(input) {
  # 1. Limpiar espacios en blanco al inicio y al final
  trimmed <- trimws(input)
  
  # 2. Comprobar si es silencio (cadena vacía)
  if (trimmed == "") {
    return("Fine. Be that way!")
  }
  
  # 3. Comprobar si tiene letras y si está completamente en mayúsculas (YELLING)
  # grep("[A-Za-z]", trimmed) asegura que contenga al menos una letra (ignorando números o puntuación sola)
  is_uppercase <- grepl("[A-Za-z]", trimmed) && trimmed == toupper(trimmed)
  
  # 4. Comprobar si es una pregunta (termina con '?')
  is_question <- grepl("\\?$", trimmed)
  
  # 5. Aplicar las reglas de respuesta de Bob
  if (is_uppercase && is_question) {
    return("Calm down, I know what I'm doing!")
  } else if (is_uppercase) {
    return("Whoa, chill out!")
  } else if (is_question) {
    return("Sure.")
  } else {
    return("Whatever.")
  }
}