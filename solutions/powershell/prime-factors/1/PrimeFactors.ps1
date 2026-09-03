Function Invoke-PrimeFactors() {
    <#
    .SYNOPSIS
    Calculate the prime factors of a given natural number.

    .DESCRIPTION
    Check if the number is divisible by 2. If it is, divide it by 2 and add 2 to the list of factors.
    If it is not, increment the number by 1 and check if it is divisible by 3. If it is, divide it by 3 and add 3 to the list of factors.

    .PARAMETER Number
    The number to factorize.

    .EXAMPLE
    Invoke-PrimeFactors -Number 12
    #>
    [CmdletBinding()]
    Param(
        [Int64]$Number
    )
    
    # Handle the special case of 1 (no prime factors)
    if ($Number -eq 1) {
        return @()
    }
    
    $factors = @()
    $n = $Number
    
    # Check for factor 2 separately (to allow skipping even numbers later)
    while ($n % 2 -eq 0) {
        $factors += 2
        $n = $n / 2
    }
    
    # Check for odd factors from 3 upwards
    $divisor = 3
    while ($divisor * $divisor -le $n) {
        while ($n % $divisor -eq 0) {
            $factors += $divisor
            $n = $n / $divisor
        }
        $divisor += 2  # Only check odd numbers
    }
    
    # If n is still greater than 1, it's a prime factor
    if ($n -gt 1) {
        $factors += $n
    }
    
    return $factors
}