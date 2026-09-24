Function Invoke-PerfectNumbers() {
    <#
    .SYNOPSIS
    Determine if a number is perfect, abundant, or deficient based on Nicomachus' (60 - 120 CE) classification scheme for natural numbers.

    .DESCRIPTION
    Calculate the aliquot sum of a number: the sum of its positive divisors not including the number itself.
    Compare the sum to the original number.
    Determine the classification: perfect, abundant, or deficient.

    .PARAMETER Number
    The number to perform the classification on.

    .EXAMPLE
    Invoke-PerfectNumbers -Number 12
    #>
    [CmdletBinding()]
    Param(
        [Int64]$Number
    )

    # Validate input: number must be positive
    if ($Number -le 0) {
        throw "error: Classification is only possible for positive integers."
    }
    
    # Handle the special case of 1 (1 is deficient)
    if ($Number -eq 1) {
        return "deficient"
    }
    
    # Calculate the aliquot sum
    $aliquotSum = 0
    
    # Find all divisors up to the square root for efficiency
    for ($i = 1; $i -le [Math]::Sqrt($Number); $i++) {
        if ($Number % $i -eq 0) {
            $aliquotSum += $i
            $divisor2 = $Number / $i
            # Add the paired divisor if it's different and not the number itself
            if ($divisor2 -ne $i -and $divisor2 -ne $Number) {
                $aliquotSum += $divisor2
            }
        }
    }
    
    # Compare aliquot sum to the original number
    if ($aliquotSum -eq $Number) {
        return "perfect"
    } elseif ($aliquotSum -gt $Number) {
        return "abundant"
    } else {
        return "deficient"
    }
}
