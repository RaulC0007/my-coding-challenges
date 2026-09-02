Imports System.Collections.Generic

Public Class GradeSchool
    Private ReadOnly _students As New Dictionary(Of String, Integer)()
    
    Public Function Add(ByVal student As String, ByVal grade As Integer) As Boolean
        ' Check if the student already exists in the school
        If _students.ContainsKey(student) Then
            Return False
        End If
        
        ' Add the student with their grade
        _students.Add(student, grade)
        Return True
    End Function

    Public Function Roster() As IEnumerable(Of String)
        ' Group students by grade, sort grades, then sort students within each grade
        Dim result As New List(Of String)()
        
        ' Get all unique grades and sort them
        Dim grades As List(Of Integer) = _students.Values.Distinct().ToList()
        grades.Sort()
        
        For Each grade As Integer In grades
            ' Get all students in this grade and sort them alphabetically
            Dim studentsInGrade As New List(Of String)()
            For Each kvp As KeyValuePair(Of String, Integer) In _students
                If kvp.Value = grade Then
                    studentsInGrade.Add(kvp.Key)
                End If
            Next
            studentsInGrade.Sort()
            
            ' Add students to the result
            result.AddRange(studentsInGrade)
        Next
        
        Return result
    End Function

    Public Function Grade(ByVal pGrade As Integer) As IEnumerable(Of String)
        ' Get all students in the specified grade and sort them alphabetically
        Dim result As New List(Of String)()
        
        For Each kvp As KeyValuePair(Of String, Integer) In _students
            If kvp.Value = pGrade Then
                result.Add(kvp.Key)
            End If
        Next
        
        result.Sort()
        Return result
    End Function
End Class