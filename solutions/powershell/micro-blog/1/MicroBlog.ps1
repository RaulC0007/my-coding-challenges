Function Invoke-MicroBlog() {
    <#
    .SYNOPSIS
    Implement a function to make micro blog post that only of 5 or less characters.

    .DESCRIPTION
    Given a string, truncate it into a string of maximum 5 characters.

    .PARAMETER Post
    A string object contains Unicode text encoding: alphabets, symbols or even emojis.

    .EXAMPLE
    Invoke-MicroBlog -Post "Lightning"
    Returns: "Light"
    #>
    [CmdletBinding()]
    Param(
        [string]$Post
    )
    
    # Convert the string to a character array (properly handles Unicode)
    $characters = $Post.ToCharArray()
    
    # If the string has 5 or fewer characters, return it as-is
    if ($characters.Length -le 5) {
        return $Post
    }
    
    # Take the first 5 characters and join them back into a string
    $truncated = $characters[0..4] -join ''
    
    return $truncated
}