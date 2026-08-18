Function Invoke-Panagram() {
    <#
    .SYNOPSIS
    Determine if a sentence is a pangram.
    
    .DESCRIPTION
    A pangram is a sentence using every letter of the alphabet at least once.
    
    .PARAMETER Sentence
    The sentence to check
    
    .EXAMPLE
    Invoke-Panagram -Sentence "The quick brown fox jumps over the lazy dog"
    
    Returns: $true
    #>
    [CmdletBinding()]
    Param(
        [string]$Sentence
    )

    # Convert the sentence to lowercase to make it case-insensitive
    $lowercaseSentence = $Sentence.ToLower()
    
    # Define all 26 letters of the alphabet
    $alphabet = 'abcdefghijklmnopqrstuvwxyz'.ToCharArray()
    
    # Check if every letter in the alphabet is present in the sentence
    foreach ($letter in $alphabet) {
        if (-not $lowercaseSentence.Contains($letter)) {
            return $false
        }
    }
    
    return $true
}
