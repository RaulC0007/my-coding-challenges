Imports System

Public Module ResistorColor
    Private ReadOnly allColors As String() = {
        "black", "brown", "red", "orange", "yellow",
        "green", "blue", "violet", "grey", "white"
    }

    Public Function ColorCode(ByVal color As String) As Integer
        Return Array.IndexOf(allColors, color.ToLower())
    End Function

    Public Function Colors() As String()
        Return allColors
    End Function
End Module