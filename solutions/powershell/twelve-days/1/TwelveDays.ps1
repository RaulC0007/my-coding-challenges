Function Invoke-TwelveDays() {
    <#
    .SYNOPSIS
    Recite the lyrics of the song: "The Twelve Days of Christmas" based on given verses.

    .DESCRIPTION
    Given a start verse and an end verse, return the string lyric of the English Christmas carol "The Twelve Days of Christmas".
    Each subsequent verse of the song builds on the previous verse.

    .PARAMETER Start
    The starting verse.

    .PARAMETER End
    The ending verse.

    .EXAMPLE
    Invoke-TwelveDays -Start 1 -End 1
    Return: "On the first day of Christmas my true love gave to me: a Partridge in a Pear Tree."
    #>
    [CmdletBinding()]
    Param(
        [int]$Start = 1,
        [int]$End = 12
    )

    $ordinals = @(
        "", "first", "second", "third", "fourth", "fifth", "sixth", 
        "seventh", "eighth", "ninth", "tenth", "eleventh", "twelfth"
    )

    $gifts = @(
        "",
        "a Partridge in a Pear Tree.",
        "two Turtle Doves, and a Partridge in a Pear Tree.",
        "three French Hens, two Turtle Doves, and a Partridge in a Pear Tree.",
        "four Calling Birds, three French Hens, two Turtle Doves, and a Partridge in a Pear Tree.",
        "five Gold Rings, four Calling Birds, three French Hens, two Turtle Doves, and a Partridge in a Pear Tree.",
        "six Geese-a-Laying, five Gold Rings, four Calling Birds, three French Hens, two Turtle Doves, and a Partridge in a Pear Tree.",
        "seven Swans-a-Swimming, six Geese-a-Laying, five Gold Rings, four Calling Birds, three French Hens, two Turtle Doves, and a Partridge in a Pear Tree.",
        "eight Maids-a-Milking, seven Swans-a-Swimming, six Geese-a-Laying, five Gold Rings, four Calling Birds, three French Hens, two Turtle Doves, and a Partridge in a Pear Tree.",
        "nine Ladies Dancing, eight Maids-a-Milking, seven Swans-a-Swimming, six Geese-a-Laying, five Gold Rings, four Calling Birds, three French Hens, two Turtle Doves, and a Partridge in a Pear Tree.",
        "ten Lords-a-Leaping, nine Ladies Dancing, eight Maids-a-Milking, seven Swans-a-Swimming, six Geese-a-Laying, five Gold Rings, four Calling Birds, three French Hens, two Turtle Doves, and a Partridge in a Pear Tree.",
        "eleven Pipers Piping, ten Lords-a-Leaping, nine Ladies Dancing, eight Maids-a-Milking, seven Swans-a-Swimming, six Geese-a-Laying, five Gold Rings, four Calling Birds, three French Hens, two Turtle Doves, and a Partridge in a Pear Tree.",
        "twelve Drummers Drumming, eleven Pipers Piping, ten Lords-a-Leaping, nine Ladies Dancing, eight Maids-a-Milking, seven Swans-a-Swimming, six Geese-a-Laying, five Gold Rings, four Calling Birds, three French Hens, two Turtle Doves, and a Partridge in a Pear Tree."
    )

    $verses = @()
    for ($i = $Start; $i -le $End; $i++) {
        $verses += "On the $($ordinals[$i]) day of Christmas my true love gave to me: $($gifts[$i])"
    }

    return $verses -join "`n"
}