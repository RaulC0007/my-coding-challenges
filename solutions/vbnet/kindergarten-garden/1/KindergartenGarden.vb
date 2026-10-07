Public Enum Plant
    Clover
    Grass
    Radishes
    Violets
End Enum

Public Class KindergartenGarden
    Private ReadOnly _diagram As String
    
    ' Students in alphabetical order
    Private ReadOnly _students As String() = {
        "Alice", "Bob", "Charlie", "David", "Eve", "Fred",
        "Ginny", "Harriet", "Ileana", "Joseph", "Kincaid", "Larry"
    }
    
    Public Sub New(ByVal diagram As String)
        _diagram = diagram
    End Sub

    Public Function Plants(ByVal student As String) As IEnumerable(Of Plant)
        ' Find the student's index in the alphabetical list
        Dim studentIndex As Integer = Array.IndexOf(_students, student)
        
        ' If student not found, return empty collection
        If studentIndex < 0 Then
            Return New List(Of Plant)()
        End If
        
        ' Split the diagram into rows
        Dim rows As String() = _diagram.Split({ControlChars.Lf, ControlChars.CrLf}, StringSplitOptions.RemoveEmptyEntries)
        
        ' Get the row strings
        Dim row1 As String = rows(0)
        Dim row2 As String = rows(1)
        
        ' Each student gets 2 cups per row, so 2 characters from each row
        Dim startIndex As Integer = studentIndex * 2
        
        ' Collect plants from both rows
        Dim result As New List(Of Plant)()
        
        ' Get plants from row 1 (first 2 characters)
        result.Add(GetPlant(row1(startIndex)))
        result.Add(GetPlant(row1(startIndex + 1)))
        
        ' Get plants from row 2 (next 2 characters)
        result.Add(GetPlant(row2(startIndex)))
        result.Add(GetPlant(row2(startIndex + 1)))
        
        Return result
    End Function
    
    Private Function GetPlant(ByVal code As Char) As Plant
        Select Case code
            Case "C"c
                Return Plant.Clover
            Case "G"c
                Return Plant.Grass
            Case "R"c
                Return Plant.Radishes
            Case "V"c
                Return Plant.Violets
            Case Else
                Throw New ArgumentException($"Unknown plant code: {code}")
        End Select
    End Function
End Class