Public Module LineUp
    Public Function Format(ByVal name As String, ByVal number As Integer) As String
        Dim suffix As String = "th"
        
        Dim lastTwo As Integer = number Mod 100
        If lastTwo < 11 OrElse lastTwo > 13 Then
            Select Case number Mod 10
                Case 1 : suffix = "st"
                Case 2 : suffix = "nd"
                Case 3 : suffix = "rd"
            End Select
        End If

        Return $"{name}, you are the {number}{suffix} customer we serve today. Thank you!"
    End Function
End Module