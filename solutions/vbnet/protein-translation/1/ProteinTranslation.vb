Imports System
Imports System.Collections.Generic

Public Module ProteinTranslation
    Public Function Proteins(ByVal strand As String) As String()
        Dim codonMap As New Dictionary(Of String, String) From {
            {"AUG", "Methionine"},
            {"UUU", "Phenylalanine"}, {"UUC", "Phenylalanine"},
            {"UUA", "Leucine"}, {"UUG", "Leucine"},
            {"UCU", "Serine"}, {"UCC", "Serine"}, {"UCA", "Serine"}, {"UCG", "Serine"},
            {"UAU", "Tyrosine"}, {"UAC", "Tyrosine"},
            {"UGU", "Cysteine"}, {"UGC", "Cysteine"},
            {"UGG", "Tryptophan"},
            {"UAA", "STOP"}, {"UAG", "STOP"}, {"UGA", "STOP"}
        }

        Dim result As New List(Of String)()

        For i As Integer = 0 To strand.Length - 1 Step 3
            If i + 3 > strand.Length Then Exit For
            Dim codon As String = strand.Substring(i, 3)
            
            If Not codonMap.ContainsKey(codon) Then Exit For
            
            Dim amino As String = codonMap(codon)
            If amino = "STOP" Then Exit For
            
            result.Add(amino)
        Next

        Return result.ToArray()
    End Function
End Module