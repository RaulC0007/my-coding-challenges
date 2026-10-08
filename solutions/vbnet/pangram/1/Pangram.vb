Imports System.Linq

Public Module Pangram
    Public Function IsPangram(ByVal input As String) As Boolean
        ' Handle null or empty strings immediately
        If String.IsNullOrEmpty(input) Then
            Return False
        End If

        ' Convert to lowercase, filter for English letters only, 
        ' get the unique ones, and check if there are exactly 26.
        Return input.ToLower() _
                    .Where(Function(c) c >= "a"c AndAlso c <= "z"c) _
                    .Distinct() _
                    .Count() = 26
    End Function
End Module