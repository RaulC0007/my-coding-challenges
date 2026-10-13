function Test-Isbn() {
    <#
    .SYNOPSIS
    Determine if an ISBN is valid or not.
    
    .DESCRIPTION
    Given a string the function should check if the provided string is a valid ISBN-10.
    
    .PARAMETER Isbn
    The ISBN to check
    
    .EXAMPLE
    Test-Isbn -Isbn "3-598-21508-8"
    
    Returns: $true
    #>
    [CmdletBinding()]
    Param(
        [string]$Isbn
    )

    # Remove all hyphens from the input string
    $cleanIsbn = $Isbn -replace '-', ''

    # An ISBN-10 must be exactly 10 characters long after removing hyphens
    if ($cleanIsbn.Length -ne 10) {
        return $false
    }

    $sum = 0

    for ($i = 0; $i -lt 10; $i++) {
        $char = $cleanIsbn[$i]
        $weight = 10 - $i
        $value = 0

        if ($char -match '^[0-9]$') {
            $value = [int][string]$char
        } elseif (($char -eq 'X' -or $char -eq 'x') -and $i -eq 9) {
            # 'X' (or 'x') is only valid as the last check character and represents 10
            $value = 10
        } else {
            # Invalid character found
            return $false
        }

        $sum += $value * $weight
    }

    # Return true if the sum modulo 11 is 0
    return ($sum % 11 -eq 0)
}
