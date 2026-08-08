Function Get-ColorCodeValue() {
    <#
    .SYNOPSIS
    Translate a list of colors to their corresponding color code values.

    .DESCRIPTION
    Given 2 colors, take the first one and times it by 10 and add the second color to it.

    .PARAMETER Colors
    The colors to translate to their corresponding color codes.

    .EXAMPLE
    Get-ColorCodeValue -Colors @("black", "brown")
    #>
    [CmdletBinding()]
    Param(
        [string[]]$Colors
    )
    
    $colorCodes = @{
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
    
    # Only take the first two colors (ignore any additional colors)
    $firstColor = $Colors[0]
    $secondColor = $Colors[1]
    
    # Check if both colors are valid
    if (-not $colorCodes.ContainsKey($firstColor)) {
        throw "Color '$firstColor' is not a valid resistor color"
    }
    if (-not $colorCodes.ContainsKey($secondColor)) {
        throw "Color '$secondColor' is not a valid resistor color"
    }
    
    # Calculate the two-digit number: first digit * 10 + second digit
    $result = ($colorCodes[$firstColor] * 10) + $colorCodes[$secondColor]
    return $result
}