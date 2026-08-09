Function Invoke-Anagram() {
    <#
    .SYNOPSIS
    Determine if a word is an anagram of other words in a list.

    .DESCRIPTION
    An anagram is a word formed by rearranging the letters of another word, e.g., spar, formed from rasp.
    Given a word and a list of possible anagrams, find the anagrams in the list.

    .PARAMETER Subject
    The word to check

    .PARAMETER Candidates
    The list of possible anagrams

    .EXAMPLE
    Invoke-Anagram -Subject "listen" -Candidates @("enlists" "google" "inlets" "banana")
    #>
    [CmdletBinding()]
    Param(
        [string]$Subject,
        [string[]]$Candidates
    )

    # Convert the subject to lowercase for case-insensitive comparison
    $subjectLower = $Subject.ToLower()
    
    # Sort the letters of the subject
    $subjectSorted = -join ($subjectLower.ToCharArray() | Sort-Object)
    
    $result = @()
    
    # Check each candidate
    foreach ($candidate in $Candidates) {
        # Skip if the candidate is the same word as the subject (case-insensitive)
        if ($candidate.ToLower() -eq $subjectLower) {
            continue
        }
        
        # Sort the letters of the candidate
        $candidateLower = $candidate.ToLower()
        $candidateSorted = -join ($candidateLower.ToCharArray() | Sort-Object)
        
        # If the sorted letters match, it's an anagram
        if ($candidateSorted -eq $subjectSorted) {
            $result += $candidate
        }
    }
    
    return $result
}