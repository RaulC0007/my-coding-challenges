Imports System
Imports System.Text

Public Module Raindrops
    Public Function Convert(ByVal number As Integer) As String
        Dim sb As New StringBuilder()

        If number Mod 3 = 0 Then
            sb.Append("Pling")
        End If
        If number Mod 5 = 0 Then
            sb.Append("Plang")
        End If
        If number Mod 7 = 0 Then
            sb.Append("Plong")
        End If

        If sb.Length = 0 Then
            Return number.ToString()
        End If

        Return sb.ToString()
    End Function
End Module