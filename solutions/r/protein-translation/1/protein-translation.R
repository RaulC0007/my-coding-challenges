translate <- function(bases) {
  if (is.null(bases) || bases == "") {
    return(NULL)
  }
  
  codon_map <- list(
    "AUG" = "Methionine",
    "UUU" = "Phenylalanine", "UUC" = "Phenylalanine",
    "UUA" = "Leucine", "UUG" = "Leucine",
    "UCU" = "Serine", "UCC" = "Serine", "UCA" = "Serine", "UCG" = "Serine",
    "UAU" = "Tyrosine", "UAC" = "Tyrosine",
    "UGU" = "Cysteine", "UGC" = "Cysteine",
    "UGG" = "Tryptophan",
    "UAA" = "STOP", "UAG" = "STOP", "UGA" = "STOP"
  )
  
  n <- nchar(bases)
  proteins <- c()
  i <- 1
  
  while (i <= n) {
    # Si quedan menos de 3 nucleótidos antes de llegar a un STOP, es una secuencia incompleta
    if (i + 2 > n) {
      stop("Incomplete RNA sequence")
    }
    
    codon <- substr(bases, i, i + 2)
    
    if (!codon %in% names(codon_map)) {
      stop("Invalid codon")
    }
    
    amino_acid <- codon_map[[codon]]
    
    if (amino_acid == "STOP") {
      return(proteins)
    }
    
    proteins <- c(proteins, amino_acid)
    i <- i + 3
  }
  
  return(proteins)
}