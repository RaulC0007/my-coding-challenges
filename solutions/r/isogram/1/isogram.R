is_isogram <- function(word) {
  # 1. Convertir a minúsculas para una comparación uniforme
  word_lower <- tolower(word)
  
  # 2. Extraer únicamente los caracteres alfabéticos (a-z)
  letters_only <- gsub("[^a-z]", "", word_lower)
  
  # 3. Dividir en un vector de caracteres individuales
  chars <- strsplit(letters_only, "")[[1]]
  
  # 4. Verificar si el número de caracteres únicos es igual al total de letras
  return(length(unique(chars)) == length(chars))
}