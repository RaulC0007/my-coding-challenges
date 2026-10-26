function Test-MatchingBrackets() {
    <#
    .SYNOPSIS
    Determine if all brackets inside a string paired and nested correctly.
    
    .DESCRIPTION
    Given a string containing brackets `[]`, braces `{}`, parentheses `()`, or any combination thereof, verify that any and all pairs are matched and nested correctly.
    The string may also contain other characters, which for the purposes of this exercise should be ignored.
    
    .PARAMETER Text
    The string to be verified.
    
    .EXAMPLE
    Test-MatchingBrackets("[]") => True
    Test-MatchingBrackets("[)]") => False
    #>
    [CmdletBinding()]
    Param(
        [string]$Text
    )

    $stack = New-Object System.Collections.Stack

    foreach ($char in $Text.ToCharArray()) {
        switch ($char) {
            '(' { $stack.Push(')') }
            '[' { $stack.Push(']') }
            '{' { $stack.Push('}') }
            ')' { if ($stack.Count -eq 0 -or $stack.Pop() -ne ')') { return $false } }
            ']' { if ($stack.Count -eq 0 -or $stack.Pop() -ne ']') { return $false } }
            '}' { if ($stack.Count -eq 0 -or $stack.Pop() -ne '}') { return $false } }
        }
    }

    return $stack.Count -eq 0
}