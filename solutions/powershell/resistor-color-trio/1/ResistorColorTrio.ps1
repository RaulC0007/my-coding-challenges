Function Get-ResistorLabel() {
    <#
    .SYNOPSIS
    Implement a function to get the label of a resistor with three color-coded bands.

    .DESCRIPTION
    Given an array of colors from a resistor, decode their resistance values and return a string represent the resistor's label.

    .PARAMETER Colors
    The array repesent the 3 colors from left to right.

    .EXAMPLE
    Get-ResistorLabel -Colors @("red", "white", "blue")
    Return: "29 megaohms"
     #>
    [CmdletBinding()]
    Param(
        [string[]]$Colors
    )
    
    # Define color to value mapping
    $colorValues = @{
        "black" = 0
        "brown" = 1
        "red" = 2
        "orange" = 3
        "yellow" = 4
        "green" = 5
        "blue" = 6
        "violet" = 7
        "grey" = 8
        "white" = 9
    }
    
    # Get the values for each color
    $digit1 = $colorValues[$Colors[0]]
    $digit2 = $colorValues[$Colors[1]]
    $multiplier = $colorValues[$Colors[2]]
    
    # Check if any color is invalid
    if ($null -eq $digit1 -or $null -eq $digit2 -or $null -eq $multiplier) {
        throw "Invalid color"
    }
    
    # Calculate the significant value (first two digits)
    $significantValue = ($digit1 * 10) + $digit2
    
    # Calculate the total resistance in ohms
    $ohms = $significantValue * [Math]::Pow(10, $multiplier)
    
    # Determine the appropriate metric prefix
    if ($ohms -ge 1000000000) {
        $formattedValue = $ohms / 1000000000
        $unit = "gigaohms"
    } elseif ($ohms -ge 1000000) {
        $formattedValue = $ohms / 1000000
        $unit = "megaohms"
    } elseif ($ohms -ge 1000) {
        $formattedValue = $ohms / 1000
        $unit = "kiloohms"
    } else {
        $formattedValue = $ohms
        $unit = "ohms"
    }
    
    # Format the value - remove trailing decimal zeros if present
    $formattedString = "$formattedValue"
    if ($formattedString -match '\.') {
        $formattedString = $formattedString.TrimEnd('0').TrimEnd('.')
    }
    
    return "$formattedString $unit"
}