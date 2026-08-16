Public Class Allergies
    Private _score As Integer
    Private _allergyMap As New Dictionary(Of String, Integer)

    Public Sub New(score As Integer)
        _score = score
        
        ' Initialize the allergy mapping with their bit values
        _allergyMap.Add("eggs", 1)
        _allergyMap.Add("peanuts", 2)
        _allergyMap.Add("shellfish", 4)
        _allergyMap.Add("strawberries", 8)
        _allergyMap.Add("tomatoes", 16)
        _allergyMap.Add("chocolate", 32)
        _allergyMap.Add("pollen", 64)
        _allergyMap.Add("cats", 128)
    End Sub

    Public Function AllergicTo(allergy As String) As Boolean
        ' Check if the allergy exists in the map
        If Not _allergyMap.ContainsKey(allergy) Then
            Return False
        End If
        
        ' Use bitwise AND to check if the allergy is present
        Return (_score And _allergyMap(allergy)) = _allergyMap(allergy)
    End Function

    Public Function List() As IList(Of String)
        Dim result As New List(Of String)
        
        ' Iterate through all allergies in the map
        For Each kvp In _allergyMap
            ' Check if the current allergy is present in the score
            If (_score And kvp.Value) = kvp.Value Then
                result.Add(kvp.Key)
            End If
        Next
        
        Return result
    End Function
End Class