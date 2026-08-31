Function Get-Slices() {
    <#
    .SYNOPSIS
    Given a string of digits, output all the contiguous substrings of length `n` in that string.
    
    .DESCRIPTION
    The function takes a string of digits and returns all the contiguous substrings of length `n` in that string.

    .PARAMETER Series
    The string of digits

    .PARAMETER SliceLength
    The length of the slices to return
    
    .EXAMPLE
    Get-Slices -Series "01234" -SliceLength 2
    
    Returns: @("01", "12", "23", "34")
    #>
    [CmdletBinding()]
    Param(
        [string]$Series,
        [int]$SliceLength
    )

    # Validate inputs
    if ($SliceLength -lt 0) {
        throw "Slice length cannot be negative."
    }
    
    if ($SliceLength -eq 0) {
        throw "Slice length cannot be zero."
    }
    
    if ($SliceLength -gt $Series.Length) {
        if ([string]::IsNullOrEmpty($Series)) {
            throw "Series cannot be empty."
        }
        throw "Slice length cannot be greater than series length."
    }
    
    $result = @()
    
    # Iterate through the string and extract substrings of the specified length
    for ($i = 0; $i -le $Series.Length - $SliceLength; $i++) {
        $result += $Series.Substring($i, $SliceLength)
    }
    
    return $result
}