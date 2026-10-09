to_rna <- function(dna) {
  if (grepl("[^GCTA]", dna)) {
    stop("Invalid DNA sequence")
  }
  chartr("GCTA", "CGAU", dna)
}