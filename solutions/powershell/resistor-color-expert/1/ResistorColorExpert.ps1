Function Get-ResistorLabel() {
    <#
    .SYNOPSIS
    Implement a function to get the label of a resistor from its color-coded bands.

    .DESCRIPTION
    Given an array of 1, 4 or 5 colors from a resistor, decode their resistance values and return a string represent the resistor's label.

    .PARAMETER Colors
    The array represent the colors from left to right.

    .EXAMPLE
    Get-ResistorLabel -Colors @("red", "black", "green", "red")
    Return: "2 megaohms ±2%"

    Get-ResistorLabel -Colors @("blue", "blue", "blue", "blue", "blue")
    Return: "666 megaohms ±0.25%"
     #>
    [CmdletBinding()]
    Param(
        [string[]]$Colors
    )
    
    # Define color mappings
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
    
    $toleranceValues = @{
        "grey" = "0.05%"
        "violet" = "0.1%"
        "blue" = "0.25%"
        "green" = "0.5%"
        "brown" = "1%"
        "red" = "2%"
        "gold" = "5%"
        "silver" = "10%"
    }
    
    # Handle special case: 1-band resistor (only black)
    if ($Colors.Count -eq 1) {
        if ($Colors[0] -ne "black") {
            throw "Invalid 1-band resistor: only black is allowed"
        }
        return "0 ohms"
    }
    
    # Get the number of bands
    $bandCount = $Colors.Count
    
    # Extract the multiplier index (based on band count)
    if ($bandCount -eq 4) {
        # 4-band: digit, digit, multiplier, tolerance
        $digit1 = $colorValues[$Colors[0]]
        $digit2 = $colorValues[$Colors[1]]
        $multiplier = $colorValues[$Colors[2]]
        $tolerance = $toleranceValues[$Colors[3]]
        
        if ($null -eq $digit1 -or $null -eq $digit2 -or $null -eq $multiplier) {
            throw "Invalid color in resistor bands"
        }
        if ($null -eq $tolerance) {
            throw "Invalid tolerance color"
        }
        
        $significantValue = ($digit1 * 10) + $digit2
        $value = $significantValue * [Math]::Pow(10, $multiplier)
        
    } elseif ($bandCount -eq 5) {
        # 5-band: digit, digit, digit, multiplier, tolerance
        $digit1 = $colorValues[$Colors[0]]
        $digit2 = $colorValues[$Colors[1]]
        $digit3 = $colorValues[$Colors[2]]
        $multiplier = $colorValues[$Colors[3]]
        $tolerance = $toleranceValues[$Colors[4]]
        
        if ($null -eq $digit1 -or $null -eq $digit2 -or $null -eq $digit3 -or $null -eq $multiplier) {
            throw "Invalid color in resistor bands"
        }
        if ($null -eq $tolerance) {
            throw "Invalid tolerance color"
        }
        
        $significantValue = ($digit1 * 100) + ($digit2 * 10) + $digit3
        $value = $significantValue * [Math]::Pow(10, $multiplier)
        
    } else {
        throw "Invalid number of bands. Only 1, 4, or 5 bands are supported."
    }
    
    # Format the value with appropriate unit
    if ($value -ge 1000000) {
        $formattedValue = $value / 1000000
        $unit = "megaohms"
    } elseif ($value -ge 1000) {
        $formattedValue = $value / 1000
        $unit = "kiloohms"
    } else {
        $formattedValue = $value
        $unit = "ohms"
    }
    
    # Special case: if value is 0, return without a unit prefix
    if ($value -eq 0) {
        return "0 ohms"
    }
    
    # Format the value - remove trailing zeros after decimal if they exist
    $formattedString = "$formattedValue"
    if ($formattedString -match '\.') {
        # Remove trailing zeros
        $formattedString = $formattedString.TrimEnd('0').TrimEnd('.')
    }
    
    return "$formattedString $unit ±$tolerance"
}