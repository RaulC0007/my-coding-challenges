Public Module Darts
    Public Function Score(ByVal x As Double, ByVal y As Double) As Integer
        ' Calculate the distance from the center using the Pythagorean theorem
        Dim distance As Double = Math.Sqrt(x * x + y * y)
        
        ' Determine the score based on the distance
        If distance > 10 Then
            ' Outside the outer circle (radius 10)
            Return 0
        ElseIf distance > 5 Then
            ' In the outer circle (radius 10, but outside middle circle radius 5)
            Return 1
        ElseIf distance > 1 Then
            ' In the middle circle (radius 5, but outside inner circle radius 1)
            Return 5
        Else
            ' In the inner circle (radius 1) - bullseye
            Return 10
        End If
    End Function
End Module