Function Get-Acronym() {
    <#
    .SYNOPSIS
    Get the acronym of a phrase.

    .DESCRIPTION
    Given a phrase, return the string acronym of that phrase.
    "As Soon As Possible" => "ASAP"
    
    .PARAMETER Phrase
    The phrase to get the acronym from.
    
    .EXAMPLE
    Get-Acronym -Phrase "As Soon As Possible"
    #>
    [CmdletBinding()]
    Param (
        [string]$Phrase
    )
    
    $clean = $Phrase -replace '[^a-zA-Z\s-_]', ''
    $words = $clean -split '[\s-_]+'
    
    $acronym = [System.Text.StringBuilder]::new()
    foreach ($word in $words) {
        if ($word.Length -gt 0) {
            [void]$acronym.Append($word.Substring(0, 1).ToUpper())
        }
    }
    
    return $acronym.ToString()
}