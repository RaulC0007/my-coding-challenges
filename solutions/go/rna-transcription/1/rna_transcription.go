package rnatranscription

func ToRNA(dna string) string {
    // Create a byte slice to hold the result
    rna := make([]byte, len(dna))
    
    // Iterate through each character and map to its RNA complement
    for i := 0; i < len(dna); i++ {
        switch dna[i] {
        case 'G':
            rna[i] = 'C'
        case 'C':
            rna[i] = 'G'
        case 'T':
            rna[i] = 'A'
        case 'A':
            rna[i] = 'U'
        default:
            rna[i] = dna[i]  // Preserve unknown characters (or could panic)
        }
    }
    
    return string(rna)
}