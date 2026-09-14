Function Invoke-RotationalCipher() {
    <#
    .SYNOPSIS
    Rotate a string by a given number of places.
    .DESCRIPTION
    Create an implementation of the rotational cipher, also sometimes called the Caesar cipher.
    
    .PARAMETER Text
    The text to rotate    
    .PARAMETER Shift
    The number of places to shift the text
    .EXAMPLE
    Invoke-RotationalCipher -Text "A" -Shift 1
    #>
    [CmdletBinding()]
    Param(
        [string]$Text, 
        [int]$Shift
    )

    $result = [System.Text.StringBuilder]::new()

    foreach ($char in $Text.ToCharArray()) {
        if ($char -cmatch '[a-z]') {
            $offset = [int][char]'a'
            $shifted = ((([int][char]$char) - $offset + $Shift) % 26 + 26) % 26 + $offset
            [void]$result.Append([char]$shifted)
        }
        elseif ($char -cmatch '[A-Z]') {
            $offset = [int][char]'A'
            $shifted = ((([int][char]$char) - $offset + $Shift) % 26 + 26) % 26 + $offset
            [void]$result.Append([char]$shifted)
        }
        else {
            [void]$result.Append($char)
        }
    }

    return $result.ToString()
}