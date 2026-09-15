function Get-SquareRoot() {
    <#
    .SYNOPSIS
    Given a natural radicand, return its square root.
    
    .DESCRIPTION
    The function takes a positive integer and return its square root value.

    .PARAMETER Radicand
    The number to get its square root.
    
    .EXAMPLE
    Get-SquareRoot -Radicand 25
    Retuns: 5
    #>
    [CmdletBinding()]
    Param(
        [int]$Radicand
    )

    # Use Heron's method (Babylonian method) for integer square root calculation
    $x = $Radicand
    $y = 1

    while ($x -gt $y) {
        $x = [Math]::Floor(($x + $y) / 2)
        $y = [Math]::Floor($Radicand / $x)
    }

    return [int]$x
}