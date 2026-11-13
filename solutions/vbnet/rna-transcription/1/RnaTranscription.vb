Imports System.Text

Public Module RnaTranscription
    Public Function ToRna(ByVal nucleotide As String) As String
        ' Use a StringBuilder for efficient string construction
        Dim rna As New StringBuilder()
        
        ' Iterate through each character in the DNA strand
        For Each c As Char In nucleotide
            Select Case c
                Case "G"c
                    rna.Append("C"c)
                Case "C"c
                    rna.Append("G"c)
                Case "T"c
                    rna.Append("A"c)
                Case "A"c
                    rna.Append("U"c)
            End Select
        Next
        
        Return rna.ToString()
    End Function
End Module