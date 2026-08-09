Function Invoke-RnaTranscription() {
    [CmdletBinding()]
    Param(
        [string]$Strand
    )

    # Trim whitespace
    $cleanStrand = $Strand.Trim()

    # Check for empty string
    if ([string]::IsNullOrEmpty($cleanStrand)) {
        return ""
    }

    # Validate the strand contains only A, C, G, T
    if ($cleanStrand -notmatch '^[ACGT]+$') {
        throw "Invalid nucleotide in strand"
    }

    # DNA -> RNA complement
    $map = @{
        'A' = 'U'
        'C' = 'G'
        'G' = 'C'
        'T' = 'A'
    }

    $rna = -join ($cleanStrand.ToCharArray() | ForEach-Object {
        $map[[string]$_]
    })

    return $rna
}
