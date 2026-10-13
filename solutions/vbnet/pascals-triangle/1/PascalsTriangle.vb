Imports System.Collections.Generic

Public Module PascalsTriangle
    Public Function Calculate(ByVal rows As Integer) As IEnumerable(Of IEnumerable(Of Integer))
        Dim triangle As New List(Of List(Of Integer))()

        ' Handle the edge case where 0 rows are requested
        If rows <= 0 Then
            Return triangle
        End If

        For i As Integer = 0 To rows - 1
            Dim row As New List(Of Integer)()
            
            ' The first element of every row is always 1
            row.Add(1)

            ' For rows after the first, calculate the inner elements
            If i > 0 Then
                Dim prevRow As List(Of Integer) = triangle(i - 1)
                
                ' Sum the two elements directly above from the previous row
                For j As Integer = 1 To i - 1
                    row.Add(prevRow(j - 1) + prevRow(j))
                Next
                
                ' The last element of every row (except the first) is always 1
                row.Add(1)
            End If

            triangle.Add(row)
        Next

        Return triangle
    End Function
End Module