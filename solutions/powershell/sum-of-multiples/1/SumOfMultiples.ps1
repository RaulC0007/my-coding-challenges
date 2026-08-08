Function Get-SumOfMultiples {
    <#
    .SYNOPSIS
    Given a number, find the sum of all the unique multiples of particular numbers up to
    but not including that number.

    .DESCRIPTION
    If we list all the natural numbers below 20 that are multiples of 3 or 5,
    we get 3, 5, 6, 9, 10, 12, 15, and 18.

    .PARAMETER Multiples
    An array of the factors 

    .PARAMETER Limit
    The value BELOW which we test for

    .EXAMPLE
    Get-SumOfMultiples -Multiples @(3, 5) -Limit 10
    
    Returns 23
    #>
    [CmdletBinding()]
    Param(
        [int[]]$Multiples,
        [int]$Limit
    )

    # Handle edge cases
    if ($Limit -le 0) {
        return 0
    }
    
    # Remove zero from multiples (would cause infinite loop)
    $multiples = $Multiples | Where-Object { $_ -ne 0 }
    
    if ($multiples.Count -eq 0) {
        return 0
    }
    
    # Create a hashtable to track unique multiples
    $uniqueMultiples = @{}
    
    # For each base value, find all multiples below the limit
    foreach ($base in $multiples) {
        # Start from the base value, increment by base each time
        for ($i = $base; $i -lt $Limit; $i += $base) {
            # Add to hashtable (duplicates are automatically handled)
            $uniqueMultiples[$i] = $true
        }
    }
    
    # Sum all the keys (the unique multiples)
    $sum = 0
    foreach ($key in $uniqueMultiples.Keys) {
        $sum += $key
    }
    
    return $sum
}