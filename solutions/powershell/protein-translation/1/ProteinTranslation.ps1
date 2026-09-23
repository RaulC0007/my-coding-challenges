function Invoke-ProteinTranslation {
    <#
    .SYNOPSIS
    Translate RNA sequences into proteins.

    .DESCRIPTION
    Take an RNA sequence and convert it into codons and then into the name of the proteins in the form of a list.

    .PARAMETER Strand
    The RNA sequence to translate.

    .EXAMPLE
    Invoke-ProteinTranslation -Strand "AUG"
    #>
    [CmdletBinding()]
    Param(
        [string]$Strand
    )
    
    $codonMap = @{
        "AUG" = "Methionine"
        "UUU" = "Phenylalanine"
        "UUC" = "Phenylalanine"
        "UUA" = "Leucine"
        "UUG" = "Leucine"
        "UCU" = "Serine"
        "UCC" = "Serine"
        "UCA" = "Serine"
        "UCG" = "Serine"
        "UAU" = "Tyrosine"
        "UAC" = "Tyrosine"
        "UGU" = "Cysteine"
        "UGC" = "Cysteine"
        "UGG" = "Tryptophan"
        "UAA" = "STOP"
        "UAG" = "STOP"
        "UGA" = "STOP"
    }

    $proteins = @()

    if (-not [string]::IsNullOrEmpty($Strand)) {
        for ($i = 0; $i -lt $Strand.Length; $i += 3) {
            if ($i + 3 -gt $Strand.Length) {
                throw "error: Invalid codon"
            }
            
            $codon = $Strand.Substring($i, 3)
            
            if (-not $codonMap.ContainsKey($codon)) {
                throw "error: Invalid codon"
            }
            
            $aminoAcid = $codonMap[$codon]
            if ($aminoAcid -eq "STOP") {
                break
            }
            
            $proteins += $aminoAcid
        }
    }
    
    return $proteins
}