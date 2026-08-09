Function Get-Raindrops() {
    <#
    .SYNOPSIS
    Convert a number to its corresponding raindrop sounds.

    .DESCRIPTION
    If a given number:
    - is divisible by 3, add "Pling" to the result.
    - is divisible by 5, add "Plang" to the result.
    - is divisible by 7, add "Plong" to the result.
    - is not divisible by 3, 5, or 7, the result should be the number as a string.

    .PARAMETER Rain
    The number to convert to raindrop sounds.

    .EXAMPLE
    Get-Raindrops -Rain 28
    Returns: "Plong"

    .EXAMPLE
    Get-Raindrops -Rain 30
    Returns: "PlingPlang"

    .EXAMPLE
    Get-Raindrops -Rain 34
    Returns: "34"
    #>
    [CmdletBinding()]
    Param(
        [int]$Rain
    )
    
    $result = ""
    
    # Check divisibility by 3
    if ($Rain % 3 -eq 0) {
        $result += "Pling"
    }
    
    # Check divisibility by 5
    if ($Rain % 5 -eq 0) {
        $result += "Plang"
    }
    
    # Check divisibility by 7
    if ($Rain % 7 -eq 0) {
        $result += "Plong"
    }
    
    # If no factors matched, return the number as a string
    if ($result -eq "") {
        return "$Rain"
    }
    
    return $result
}