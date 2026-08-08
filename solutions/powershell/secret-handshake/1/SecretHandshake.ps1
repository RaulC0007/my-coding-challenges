Function Invoke-SecretHandshake() {
    <#
    .SYNOPSIS
    Convert a number between 1 and 31 to a sequence of actions in the secret handshake.

    .DESCRIPTION
    The sequence of actions is chosen by looking at the rightmost five digits of the number once it's been converted to binary.
    Start at the right-most digit and move left.

    The actions for each number place are:
    00001 = wink
    00010 = double blink
    00100 = close your eyes
    01000 = jump
    10000 = Reverse the order of the operations in the secret handshake.
    
    .PARAMETER Number
    The value to be converted into a sequence of actions.

    .EXAMPLE
    Invoke-SecretHandshake -Number 2
    Returns: @("double blink")
     #>
    [CmdletBinding()]
    Param(
        [int]$Number
    )
    
    # Define the actions mapping (bit position to action)
    $actionMap = @{
        1 = "wink"             # 00001
        2 = "double blink"     # 00010
        4 = "close your eyes"  # 00100
        8 = "jump"             # 01000
    }
    
    $reverseBit = 16  # 10000
    
    # Collect actions by checking bits from least significant to most significant
    $actions = [System.Collections.ArrayList]::new()
    
    # Check bits 0-3 (positions 1, 2, 4, 8)
    foreach ($bit in @(1, 2, 4, 8)) {
        if (($Number -band $bit) -ne 0) {
            [void]$actions.Add($actionMap[$bit])
        }
    }
    
    # Check if the reverse bit is set
    if (($Number -band $reverseBit) -ne 0) {
        # If reverse bit is set, we need to reverse the actions
        # Build a new list in reverse order
        $reversed = [System.Collections.ArrayList]::new()
        for ($i = $actions.Count - 1; $i -ge 0; $i--) {
            [void]$reversed.Add($actions[$i])
        }
        return ,$reversed.ToArray()
    }
    
    # Return the actions as a string array
    return ,$actions.ToArray()
}