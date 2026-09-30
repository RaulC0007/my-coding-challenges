Enum Sublist {
    EQUAL
    UNEQUAL
    SUBLIST
    SUPERLIST
}

Function Invoke-Sublist() {
    <#
    .SYNOPSIS
    Determine the relationship of two arrays.

    .DESCRIPTION
    Given two arrays, determine the relationship of the first array relating to the second array.
    There are four possible categories: EQUAL, UNEQUAL, SUBLIST and SUPERLIST.
    Note: This exercise use Enum values for return.
    
    .PARAMETER Data1
    The first array

    .PARAMETER Data2
    The second array

    .EXAMPLE
    Invoke-Sublist -Data1 @(1,2,3) -Data2 @(1,2,3)
    Return: [Sublist]::EQUAL

    Invoke-Sublist -Data1 @(1,2) -Data2 @(1,2,3)
    Return: [Sublist]::SUBLIST
    #>
    [CmdletBinding()]
    Param (
        [object[]]$Data1,
        [object[]]$Data2
    )
    
    # Helper function to check if listA is a contiguous sublist of listB
    function Test-IsSublist($listA, $listB) {
        # Empty list is a sublist of any list
        if ($listA.Count -eq 0) {
            return $true
        }
        
        # If listA is longer than listB, it can't be a sublist
        if ($listA.Count -gt $listB.Count) {
            return $false
        }
        
        # Check each possible starting position in listB
        for ($i = 0; $i -le $listB.Count - $listA.Count; $i++) {
            $match = $true
            for ($j = 0; $j -lt $listA.Count; $j++) {
                if ($listB[$i + $j] -ne $listA[$j]) {
                    $match = $false
                    break
                }
            }
            if ($match) {
                return $true
            }
        }
        
        return $false
    }
    
    # Check if lists are equal
    if ($Data1.Count -eq $Data2.Count) {
        $equal = $true
        for ($i = 0; $i -lt $Data1.Count; $i++) {
            if ($Data1[$i] -ne $Data2[$i]) {
                $equal = $false
                break
            }
        }
        if ($equal) {
            return [Sublist]::EQUAL
        }
    }
    
    # Check if Data1 is a sublist of Data2
    if (Test-IsSublist $Data1 $Data2) {
        return [Sublist]::SUBLIST
    }
    
    # Check if Data1 is a superlist of Data2 (i.e., Data2 is a sublist of Data1)
    if (Test-IsSublist $Data2 $Data1) {
        return [Sublist]::SUPERLIST
    }
    
    # Otherwise, they are unequal
    return [Sublist]::UNEQUAL
}