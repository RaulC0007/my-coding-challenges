Function Invoke-Isogram() {
    <#
    .SYNOPSIS
    Determine if a word or phrase is an isogram.
    
    .DESCRIPTION
    An isogram (also known as a "nonpattern word") is a word or phrase without a repeating letter,
    however spaces and hyphens are allowed to appear multiple times.
    
    .PARAMETER Phrase
    The phrase to check if it is an isogram.
    
    .EXAMPLE
    Invoke-Isogram -Phrase "isogram"
    
    Returns: $true
    #>
    [CmdletBinding()]
    Param(
        [string]$Phrase
    )

    # Remove spaces and hyphens, and convert to lowercase
    $cleanPhrase = $Phrase -replace '[- ]', '' -replace '[^a-zA-Z]', '' | ForEach-Object { $_.ToLower() }
    
    # Check for duplicate letters
    $seenLetters = @{}
    
    foreach ($char in $cleanPhrase.ToCharArray()) {
        if ($seenLetters.ContainsKey($char)) {
            return $false
        }
        $seenLetters[$char] = $true
    }
    
    return $true
}