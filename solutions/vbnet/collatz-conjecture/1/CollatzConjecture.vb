Public Module CollatzConjecture
    Public Function Steps(ByVal number As Integer) As Integer
        If number < 1 Then
            Throw New ArgumentOutOfRangeException(NameOf(number), "Only positive integers are allowed")
        End If

        Dim current As Integer = number
        Dim stepCount As Integer = 0

        While current <> 1
            If current Mod 2 = 0 Then
                current = current \ 2
            Else
                current = current * 3 + 1
            End If
            stepCount += 1
        End While

        Return stepCount
    End Function
End Module