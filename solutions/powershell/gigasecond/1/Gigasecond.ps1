Function Add-Gigasecond() {
    <#
    .SYNOPSIS
    Add a gigasecond to a date.

    .DESCRIPTION
    Take a moment and add a gigasecond to it.

    .PARAMETER Time
    A datetime object, to which a gigasecond will be added.

    .EXAMPLE
    Add-Gigasecond -Time
    #>
    [CmdletBinding()]
    Param(
        [DateTime]$Time
    )

    # A gigasecond is 1,000,000,000 seconds
    $gigasecond = [TimeSpan]::FromSeconds(1000000000)
    
    # Add the gigasecond to the given time
    $result = $Time.Add($gigasecond)
    
    return $result
}