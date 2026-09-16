function Get-WordCount() {
    <#
    .SYNOPSIS
    Given a phrase, count how many time each word appear.

    .DESCRIPTION
    Count how many time each word appear in a phrase. Number in string also counted as word, and words are case insensitive.

    .PARAMETER Phrase
    The phrase to count words.

    .EXAMPLE
    Get-WordCount -Phrase "Hello, welcome to exercism!"
    Return: @{ hello = 1; welcome = 1; to = 1; exercism = 1}
    #>
    [CmdletBinding()]
    Param(
        [string]$Phrase
    )
    
    # Convert to lowercase for case-insensitive counting
    $lowerPhrase = $Phrase.ToLower()
    
    # Split on any character that is not a letter, digit, or apostrophe
    $tokens = $lowerPhrase -split "[^a-z0-9']+"
    
    # Create a hashtable to count occurrences
    $wordCount = @{}
    foreach ($token in $tokens) {
        # Trim leading and trailing apostrophes (e.g. from quoted words like 'hey')
        $word = $token.Trim("'")
        
        if (-not [string]::IsNullOrEmpty($word)) {
            if ($wordCount.ContainsKey($word)) {
                $wordCount[$word]++
            } else {
                $wordCount[$word] = 1
            }
        }
    }
    
    return $wordCount
}