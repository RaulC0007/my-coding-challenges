Public Module BottleSong

    Private ReadOnly Numbers() As String = {
        "no", "one", "two", "three", "four", "five",
        "six", "seven", "eight", "nine", "ten"
    }

    Private Function Number(ByVal n As Integer, ByVal capitalize As Boolean) As String
        Dim word As String = Numbers(n)
        If capitalize Then
            word = Char.ToUpper(word(0)) & word.Substring(1)
        End If
        Return word
    End Function

    Private Function BottleWord(ByVal n As Integer) As String
        Return If(n = 1, "bottle", "bottles")
    End Function

    Private Function Verse(ByVal n As Integer) As String
        Dim lines As New List(Of String)

        lines.Add($"{Number(n, True)} green {BottleWord(n)} hanging on the wall,")
        lines.Add($"{Number(n, True)} green {BottleWord(n)} hanging on the wall,")
        lines.Add("And if one green bottle should accidentally fall,")
        lines.Add($"There'll be {Number(n - 1, False)} green {BottleWord(n - 1)} hanging on the wall.")

        Return String.Join(Environment.NewLine, lines)
    End Function

    Public Function Recite(ByVal startBottles As Integer, ByVal takeDown As Integer) As String
        Dim verses As New List(Of String)

        For i As Integer = 0 To takeDown - 1
            verses.Add(Verse(startBottles - i))
        Next

        Return String.Join(Environment.NewLine & Environment.NewLine, verses)
    End Function

End Module