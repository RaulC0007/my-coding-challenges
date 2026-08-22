Function Invoke-BinarySearch() {
    <#
    .SYNOPSIS
    Perform a binary search on a sorted array.

    .DESCRIPTION
    Take an array of integers and a search value and return the index of the value in the array.

    .PARAMETER Array
    The array to search.

    .PARAMETER Value
    The value to search for.

    .EXAMPLE
    Invoke-BinarySearch -Array @(1, 2, 3, 4, 5) -Value 3
    #>
    [CmdletBinding()]
    Param(
        [Int64[]]$Array,
        [Int64]$Value
    )

    $left = 0
    $right = $Array.Length - 1

    while ($left -le $right) {
        # Find the middle index
        $mid = [Math]::Floor(($left + $right) / 2)
        
        # Check if the middle element is the value we're looking for
        if ($Array[$mid] -eq $Value) {
            return $mid
        }
        
        # If the value is greater than the middle element, search the right half
        if ($Array[$mid] -lt $Value) {
            $left = $mid + 1
        }
        # If the value is less than the middle element, search the left half
        else {
            $right = $mid - 1
        }
    }

    # Value not found
    throw "error: value not in array"
}
