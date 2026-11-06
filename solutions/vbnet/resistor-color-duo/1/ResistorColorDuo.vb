Imports System
Imports System.Collections.Generic

Public Module ResistorColorDuo
    Private ReadOnly colorMap As New Dictionary(Of String, Integer) From {
        {"black", 0}, {"brown", 1}, {"red", 2}, {"orange", 3}, {"yellow", 4},
        {"green", 5}, {"blue", 6}, {"violet", 7}, {"grey", 8}, {"white", 9}
    }

    Public Function Value(ByVal colors As String()) As Integer
        If colors Is Nothing OrElse colors.Length < 2 Then
            Return 0
        End If

        Dim tens As Integer = colorMap(colors(0).ToLower())
        Dim units As Integer = colorMap(colors(1).ToLower())

        Return tens * 10 + units
    End Function
End Module