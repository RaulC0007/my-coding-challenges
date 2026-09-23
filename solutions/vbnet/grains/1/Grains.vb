Public Module Grains
    Public Function Square(ByVal n As Integer) As ULong
        If n < 1 OrElse n > 64 Then
            Throw New ArgumentOutOfRangeException(NameOf(n), "square must be between 1 and 64")
        End If

        Return CULng(1) << (n - 1)
    End Function

    Public Function Total() As ULong
        ' Sum of a geometric series 2^0 + 2^1 + ... + 2^63 = 2^64 - 1
        Return ULong.MaxValue
    End Function
End Module