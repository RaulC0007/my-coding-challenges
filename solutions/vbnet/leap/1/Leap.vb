Public Module Leap
    Public Function IsLeapYear(ByVal year As Integer) As Boolean
        ' A year is a leap year if:
        ' 1. It is divisible by 4
        ' 2. AND it is NOT divisible by 100, OR it is divisible by 400
        Return (year Mod 4 = 0) AndAlso (year Mod 100 <> 0 OrElse year Mod 400 = 0)
    End Function
End Module