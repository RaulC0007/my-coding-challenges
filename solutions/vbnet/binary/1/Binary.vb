Public Class Binary
    Private _value As String
    Private _isValid As Boolean

    Public Sub New(value As String)
        _value = value
        _isValid = True
        
        ' Validate the binary string
        If String.IsNullOrEmpty(value) Then
            _isValid = False
            Return
        End If
        
        ' Check that all characters are either '0' or '1'
        For Each c As Char In value
            If c <> "0"c AndAlso c <> "1"c Then
                _isValid = False
                Exit For
            End If
        Next
    End Sub

    Public Function ToDecimal() As Integer
        ' If the binary string is invalid, return 0
        If Not _isValid Then
            Return 0
        End If
        
        Dim decimalValue As Integer = 0
        Dim power As Integer = 0
        
        ' Iterate from right to left (least significant digit first)
        For i As Integer = _value.Length - 1 To 0 Step -1
            Dim digit As Integer = Integer.Parse(_value(i))
            decimalValue += digit * CInt(Math.Pow(2, power))
            power += 1
        Next
        
        Return decimalValue
    End Function
End Class