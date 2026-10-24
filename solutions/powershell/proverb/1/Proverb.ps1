Function Get-Proverb() {
    <#
    .SYNOPSIS
    Given a list of inputs, generate the relevant proverb.

    .DESCRIPTION
    Take a list of inputs and output the full text of a proverbial rhyme base on those inputs.

    .PARAMETER Data
    The list of inputs to generate the proverb.

    .EXAMPLE
    Get-Proverb -Data @("nail", "shoe", "horse", "rider", "message", "battle", "kingdom")
    #>
    [CmdletBinding()]
    Param(
        [string[]]$Data
    )

    # Handle empty or null input
    if (-not $Data -or $Data.Length -eq 0) {
        return [string]::Empty
    }

    $proverbLines = @()

    # Generate lines for each pair of consecutive items
    for ($i = 0; $i -lt $Data.Length - 1; $i++) {
        $current = $Data[$i]
        $next = $Data[$i + 1]
        $proverbLines += "For want of a $current the $next was lost."
    }

    # Add the concluding line using the first item
    $proverbLines += "And all for the want of a $($Data[0])."

    # Join lines with Windows line ending (`r`n) expected by the test assertions
    return $proverbLines -join "`r`n"
}