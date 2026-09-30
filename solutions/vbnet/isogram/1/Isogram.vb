Imports System.Linq

Public Module Isogram
    Public Function IsIsogram(ByVal word As String) As Boolean
        ' Convert to lowercase and filter out spaces and hyphens
        Dim letters = word.ToLower().Where(Function(c) c <> " "c AndAlso c <> "-"c)
        
        ' An isogram has no repeating letters, so the count of distinct letters 
        ' should exactly match the total count of letters.
        Return letters.Distinct().Count() = letters.Count()
    End Function
End Module