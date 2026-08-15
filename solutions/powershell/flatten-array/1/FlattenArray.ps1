Function Invoke-FlattenArray() {
    <#
    .SYNOPSIS
    Take a nested array and return a single flattened array with all values except null.

    .DESCRIPTION
    Given an array, flatten it and keep all values except null.

    .PARAMETER Array
    The nested array to be flattened.

    .EXAMPLE
    Invoke-FlattenArray -Array @(1, @(2, 3, $null, 4), @($null), 5)
    Return: @(1, 2, 3, 4, 5)
    #>
    [CmdletBinding()]
    Param(
        [System.Object[]]$Array
    )
    
    $result = [System.Collections.ArrayList]::new()
    
    function Flatten($item) {
        # Check if the item is an array
        if ($item -is [System.Array]) {
            # If it's an array, iterate through its elements
            foreach ($element in $item) {
                Flatten $element
            }
        }
        else {
            # If it's not null, add it to the result
            if ($null -ne $item) {
                [void]$result.Add($item)
            }
        }
    }
    
    # Start the flattening process
    Flatten $Array
    
    # Return the result as an array
    return ,$result.ToArray()
}