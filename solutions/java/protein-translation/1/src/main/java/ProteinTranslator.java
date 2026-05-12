import java.util.List;
import java.util.ArrayList;

class ProteinTranslator {

    List<String> translate(String rnaSequence) {
        List<String> proteins = new ArrayList<>();
        
        // Process RNA in chunks of 3 nucleotides (codons)
        for (int i = 0; i < rnaSequence.length(); i += 3) {
            // Handle incomplete codon at end of sequence - THROW exception
            if (i + 3 > rnaSequence.length()) {
                throw new IllegalArgumentException("Invalid codon");
            }
            
            String codon = rnaSequence.substring(i, i + 3);
            String aminoAcid = codonToAminoAcid(codon);
            
            // STOP codon terminates translation
            if ("STOP".equals(aminoAcid)) {
                break;
            }
            
            proteins.add(aminoAcid);
        }
        
        return proteins;
    }
    
    private String codonToAminoAcid(String codon) {
        switch (codon) {
            case "AUG":
                return "Methionine";
            case "UUU":
            case "UUC":
                return "Phenylalanine";
            case "UUA":
            case "UUG":
                return "Leucine";
            case "UCU":
            case "UCC":
            case "UCA":
            case "UCG":
                return "Serine";
            case "UAU":
            case "UAC":
                return "Tyrosine";
            case "UGU":
            case "UGC":
                return "Cysteine";
            case "UGG":
                return "Tryptophan";
            case "UAA":
            case "UAG":
            case "UGA":
                return "STOP";
            default:
                // Exact message expected by tests - NO codon appended
                throw new IllegalArgumentException("Invalid codon");
        }
    }
}