Public Module Etl
    Public Function Transform(ByVal old As Dictionary(Of Integer, String())) As Dictionary(Of String, Integer)
        Dim result As New Dictionary(Of String, Integer)

        For Each kvp As KeyValuePair(Of Integer, String()) In old
            Dim score As Integer = kvp.Key
            For Each letter As String In kvp.Value
                result(letter.ToLower()) = score
            Next
        Next

        Return result
    End Function
End Module