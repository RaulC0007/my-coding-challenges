Public Module Hamming
    Public Function Distance(ByVal firstStrand As String, ByVal secondStrand As String) As Integer
        ' Check if the strands have the same length
        If firstStrand.Length <> secondStrand.Length Then
            Throw New ArgumentException("Strands must be of equal length")
        End If
        
        Dim differences As Integer = 0
        
        ' Compare each position
        For i As Integer = 0 To firstStrand.Length - 1
            If firstStrand(i) <> secondStrand(i) Then
                differences += 1
            End If
        Next
        
        Return differences
    End Function
End Module