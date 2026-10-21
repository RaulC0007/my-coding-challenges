Imports System
Imports System.Collections.Generic

Public Module Proverb
    Public Function Recite(ByVal subjects As String()) As String()
        If subjects Is Nothing OrElse subjects.Length = 0 Then
            Return New String() {}
        End If

        Dim lines As New List(Of String)()

        For i As Integer = 0 To subjects.Length - 2
            lines.Add(String.Format("For want of a {0} the {1} was lost.", subjects(i), subjects(i + 1)))
        Next

        lines.Add(String.Format("And all for the want of a {0}.", subjects(0)))

        Return lines.ToArray()
    End Function
End Module