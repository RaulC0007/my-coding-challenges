Public Module ArmstrongNumbers
    Public Function IsArmstrongNumber(ByVal number As Integer) As Boolean
        ' Handle the case where number is 0
        If number = 0 Then
            Return True
        End If
        
        ' Convert number to string to easily access digits
        Dim numberString As String = number.ToString()
        Dim digitCount As Integer = numberString.Length
        
        ' Calculate the sum of each digit raised to the power of digitCount
        Dim sum As Integer = 0
        For Each digitChar As Char In numberString
            Dim digit As Integer = Integer.Parse(digitChar)
            sum += CInt(Math.Pow(digit, digitCount))
        Next
        
        ' Check if the sum equals the original number
        Return sum = number
    End Function
End Module