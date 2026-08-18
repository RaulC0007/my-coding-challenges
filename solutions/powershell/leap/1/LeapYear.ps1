function Test-LeapYear {
    <#
    .SYNOPSIS
    Determine whether a given year is a leap year.
    
    .DESCRIPTION
    A leap year (in the Gregorian calendar) occurs:
    - In every year that is evenly divisible by 4.
    - Unless the year is evenly divisible by 100, in which case it's only a leap year if the year is also evenly divisible by 400.
    
    .PARAMETER Year
    The year to check.
    
    .EXAMPLE
    Test-LeapYear -Year 2020
    Returns: True
    
    .EXAMPLE
    Test-LeapYear -Year 1900
    Returns: False
    
    .EXAMPLE
    Test-LeapYear -Year 2000
    Returns: True
    #>
    [CmdletBinding()]
    Param(
        [int]$Year
    )
    
    # A year is a leap year if:
    # 1. It is divisible by 4
    # 2. AND it is NOT divisible by 100, OR it is divisible by 400
    if ($Year % 4 -eq 0 -and ($Year % 100 -ne 0 -or $Year % 400 -eq 0)) {
        return $true
    }
    
    return $false
}