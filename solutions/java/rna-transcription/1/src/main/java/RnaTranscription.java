class RnaTranscription {

    String transcribe(String dnaStrand) {
        if (dnaStrand == null || dnaStrand.isEmpty()) {
            return "";
        }

        StringBuilder rnaStrand = new StringBuilder();
        
        for (char nucleotide : dnaStrand.toCharArray()) {
            switch (nucleotide) {
                case 'G':
                    rnaStrand.append('C');
                    break;
                case 'C':
                    rnaStrand.append('G');
                    break;
                case 'T':
                    rnaStrand.append('A');
                    break;
                case 'A':
                    rnaStrand.append('U');
                    break;
                default:
                    // Handle invalid nucleotides if necessary, 
                    // though exercise tests usually provide valid input.
                    throw new IllegalArgumentException("Invalid nucleotide: " + nucleotide);
            }
        }
        
        return rnaStrand.toString();
    }

}