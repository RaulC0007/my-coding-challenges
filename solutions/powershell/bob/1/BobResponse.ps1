Function Get-BobResponse() {
    <#
    .SYNOPSIS
    Bob is a lackadaisical teenager. In conversation, his responses are very limited.
    
    .DESCRIPTION
    Bob is a lackadaisical teenager. In conversation, his responses are very limited.

    Bob answers 'Sure.' if you ask him a question.

    He answers 'Whoa, chill out!' if you yell at him.

    He answers 'Calm down, I know what I'm doing!' if you yell a question at him.

    He says 'Fine. Be that way!' if you address him without actually saying
    anything.

    He answers 'Whatever.' to anything else.
    
    .PARAMETER HeyBob
    The sentence you say to Bob.
    
    .EXAMPLE
    Get-BobResponse -HeyBob "Hi Bob"
    #>
    [CmdletBinding()]
    Param(
        [string]$HeyBob
    )

    # Trim whitespace to check for silence
    $trimmed = $HeyBob.Trim()
    
    # Check for silence (nothing or only whitespace)
    if ([string]::IsNullOrEmpty($trimmed)) {
        return "Fine. Be that way!"
    }
    
    # Check if it's a question (ends with ?)
    $isQuestion = $trimmed.EndsWith('?')
    
    # Check if it's yelling (all letters are uppercase and there is at least one letter)
    $hasLetter = $trimmed -match '[a-zA-Z]'
    $isYelling = $hasLetter -and ($trimmed -ceq $trimmed.ToUpper())
    
    # Determine response based on yelling and question status
    if ($isYelling -and $isQuestion) {
        return "Calm down, I know what I'm doing!"
    } elseif ($isYelling) {
        return "Whoa, chill out!"
    } elseif ($isQuestion) {
        return "Sure."
    } else {
        return "Whatever."
    }
}