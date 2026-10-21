Imports System
Imports System.Collections.Generic

Public Module ResistorColorTrio
    Private ReadOnly colorMap As New Dictionary(Of String, Integer) From {
        {"black", 0}, {"brown", 1}, {"red", 2}, {"orange", 3}, {"yellow", 4},
        {"green", 5}, {"blue", 6}, {"violet", 7}, {"grey", 8}, {"white", 9}
    }

    Public Function Label(ByVal colors As String()) As String
        If colors Is Nothing OrElse colors.Length < 3 Then
            Return "0 ohms"
        End If

        Dim d1 As Integer = colorMap(colors(0).ToLower())
        Dim d2 As Integer = colorMap(colors(1).ToLower())
        Dim zeros As Integer = colorMap(colors(2).ToLower())

        Dim baseValue As Long = (d1 * 10 + d2) * CType(Math.Pow(10, zeros), Long)

        If baseValue >= 1000000000 AndAlso baseValue Mod 1000000000 = 0 Then
            Return (baseValue \ 1000000000).ToString() & " gigaohms"
        ElseIf baseValue >= 1000000 AndAlso baseValue Mod 1000000 = 0 Then
            Return (baseValue \ 1000000).ToString() & " megaohms"
        ElseIf baseValue >= 1000 AndAlso baseValue Mod 1000 = 0 Then
            Return (baseValue \ 1000).ToString() & " kiloohms"
        Else
            Return baseValue.ToString() & " ohms"
        End If
    End Function
End Module