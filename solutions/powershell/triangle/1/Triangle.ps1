Enum Triangle {
    Equilateral
    Isosceles
    Scalene
}

Function Get-Triangle() {
    <#
    .SYNOPSIS
    Determine if a triangle is equilateral, isosceles, or scalene.

    .DESCRIPTION
    Given 3 sides of a triangle, return the type of that triangle if it is a valid triangle.
    
    .PARAMETER Sides
    The lengths of a triangle's sides.

    .EXAMPLE
    Get-Triangle -Sides @(1,2,3)
    Return: [Triangle]::SCALENE
    #>
    
    [CmdletBinding()]
    Param (
        [double[]]$Sides
    )
    
    # Ensure we have exactly 3 sides
    if ($Sides.Count -ne 3) {
        throw "A triangle must have exactly 3 sides"
    }
    
    # Extract the three sides
    $a = $Sides[0]
    $b = $Sides[1]
    $c = $Sides[2]
    
    # Check if all sides are greater than 0
    if ($a -le 0 -or $b -le 0 -or $c -le 0) {
        throw "All side lengths must be positive."
    }
    
    # Check the triangle inequality theorem
    if (($a + $b -lt $c) -or ($b + $c -lt $a) -or ($a + $c -lt $b)) {
        throw "Side lengths violate triangle inequality."
    }
    
    # Determine the triangle type
    if ($a -eq $b -and $b -eq $c) {
        return [Triangle]::Equilateral
    } elseif ($a -eq $b -or $b -eq $c -or $a -eq $c) {
        return [Triangle]::Isosceles
    } else {
        return [Triangle]::Scalene
    }
}