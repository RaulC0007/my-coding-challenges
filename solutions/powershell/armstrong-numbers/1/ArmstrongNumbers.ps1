Function Invoke-ArmstrongNumbers() {
    <#
    .SYNOPSIS
    Determine if a number is an Armstrong number.

    .DESCRIPTION
    An Armstrong number is a number that is the sum of its own digits each raised to the power of the number of digits.

    .PARAMETER Number
    The number to check.

    .EXAMPLE
    Invoke-ArmstrongNumbers -Number 12
    #>
    [CmdletBinding()]
    Param(
        [Int64]$Number
    )

    # Convert the number to a string to get the digits
    $numberString = $Number.ToString()
    $digitCount = $numberString.Length
    
    $sum = 0
    
    # Iterate through each digit
    foreach ($digitChar in $numberString.ToCharArray()) {
        $digit = [Int64]::Parse($digitChar)
        $sum += [Math]::Pow($digit, $digitCount)
    }
    
    # Check if the sum equals the original number
    return $sum -eq $Number
}