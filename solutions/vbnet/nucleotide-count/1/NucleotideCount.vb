Imports System
Imports System.Collections.Generic

Public Module NucleotideCount
    Public Function Count(ByVal sequence As String) As IDictionary(Of Char, Integer)
        ' Initialize the dictionary with all valid nucleotides set to 0
        Dim counts As New Dictionary(Of Char, Integer) From {
            {"A"c, 0},
            {"C"c, 0},
            {"G"c, 0},
            {"T"c, 0}
        }

        ' Iterate through each character in the sequence
        For Each c As Char In sequence
            If counts.ContainsKey(c) Then
                ' If it's a valid nucleotide, increment its count
                counts(c) += 1
            Else
                ' If it's not A, C, G, or T, throw an error
                Throw New ArgumentException("Invalid nucleotide found in sequence.")
            End If
        Next

        Return counts
    End Function
End Module