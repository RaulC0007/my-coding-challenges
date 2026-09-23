function Get-Accumulation {
    <#
    .SYNOPSIS
    Accumulate a list of values based on the operation given.

    .DESCRIPTION
    Given the collection of numbers and a scriptblock operation, returns a new collection 
    containing the result of applying that operation to each element.

    .PARAMETER List
    Collection of numbers to perform an operation on.

    .PARAMETER Func
    A scriptblock containing the operation to perform on the given $List

    .EXAMPLE
    Get-Accumulation -List 1,2,3,4,5 -Func { $_ * $_ }
    #>
    [CmdletBinding()]
    Param(
        [PSObject[]]$List,
        [scriptblock]$Func
    )

    $result = @()
    if ($null -eq $List) {
        return $result
    }

    foreach ($item in $List) {
        $result += $Func.Invoke($item)
    }

    return $result
}