Public Module EliudsEggs
    Public Function EggCount(ByVal number As Integer) As Integer
        Dim count As Integer = 0
        Dim n As Integer = number
        
        ' Count bits by checking the least significant bit repeatedly
        While n > 0
            ' Check if the least significant bit is 1
            If (n And 1) = 1 Then
                count += 1
            End If
            ' Shift right by 1 to check the next bit
            n = n >> 1
        End While
        
        Return count
    End Function
End Module