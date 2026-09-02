Function Invoke-Encode() {
    <#
    .SYNOPSIS
    Encode a string using the Atbash cipher.

    .DESCRIPTION
    The Atbash cipher is a simple substitution cipher that relies on transposing all the letters in the 
    alphabet such that the resulting alphabet is backwards. 
    The first letter is replaced with the last letter, the second with the second-last, and so on.

    .PARAMETER Phrase
    The string to encode.

    .EXAMPLE
    Invoke-Encode -Phrase "yes"
    #>
    [CmdletBinding()]
    Param(
        [string]$Phrase
    )
    
    # Convert to lowercase and remove punctuation, keep letters and numbers
    $clean = $Phrase.ToLower() -replace '[^a-z0-9]', ''
    
    $result = ""
    $count = 0
    
    foreach ($char in $clean.ToCharArray()) {
        if ($char -match '[a-z]') {
            # Atbash substitution for letters: 'a'<->'z', 'b'<->'y', etc.
            $offset = [int][char]$char - [int][char]'a'
            $newChar = [char]([int][char]'z' - $offset)
            $result += $newChar
        } else {
            # Numbers stay the same
            $result += $char
        }
        
        $count++
        # Add space every 5 characters (except after the last character)
        if ($count % 5 -eq 0 -and $count -lt $clean.Length) {
            $result += " "
        }
    }
    
    return $result
}

Function Invoke-Decode(){
    <#
    .SYNOPSIS
    Decode a string using the Atbash cipher.

    .DESCRIPTION
    The Atbash cipher is a simple substitution cipher that relies on transposing all the letters in the 
    alphabet such that the resulting alphabet is backwards. 
    The first letter is replaced with the last letter, the second with the second-last, and so on.

    .PARAMETER Phrase
    The string to decode.

    .EXAMPLE
    Invoke-Decode -Phrase "yes"
    #>
    [CmdletBinding()]
    Param(
        [string]$Phrase
    )

    # Remove spaces (they were only added for encoding grouping)
    $clean = $Phrase -replace ' ', ''
    
    $result = ""
    
    foreach ($char in $clean.ToCharArray()) {
        if ($char -match '[a-z]') {
            # Atbash substitution for letters (same as encoding since it's symmetric)
            $offset = [int][char]$char - [int][char]'a'
            $newChar = [char]([int][char]'z' - $offset)
            $result += $newChar
        } else {
            # Numbers stay the same
            $result += $char
        }
    }
    
    return $result
}