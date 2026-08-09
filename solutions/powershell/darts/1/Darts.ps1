Function Invoke-Darts() {
    <#
    .SYNOPSIS
    Calculate the earned points in a single toss of a Darts game.

    .DESCRIPTION
    Take a coordinate of a point and calculate the distance from the center of the dartboard.
    Then depending on the distance and which concentric circle the point lies in, return the
    number of points earned.

    .PARAMETER X
    The X coordinate of the dart.

    .PARAMETER Y
    The Y coordinate of the dart.

    .EXAMPLE
    Invoke-Darts -X 0 -Y 10
    #>
    [CmdletBinding()]
    Param(
        [Double]$X,
        [Double]$Y
    )
    
    # Calculate the distance from the center using the Pythagorean theorem
    $distance = [Math]::Sqrt(($X * $X) + ($Y * $Y))
    
    # Determine the score based on the distance
    if ($distance -gt 10) {
        # Outside the outer circle (radius 10)
        return 0
    } elseif ($distance -gt 5) {
        # In the outer circle (radius 10, but outside middle circle radius 5)
        return 1
    } elseif ($distance -gt 1) {
        # In the middle circle (radius 5, but outside inner circle radius 1)
        return 5
    } else {
        # In the inner circle (radius 1) - bullseye
        return 10
    }
}