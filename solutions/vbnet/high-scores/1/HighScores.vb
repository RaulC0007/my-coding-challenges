Imports System.Collections.Generic
Imports System.Linq

Public Class HighScores
    Private ReadOnly _scores As List(Of Integer)
    
    Public Sub New(ByVal scores As List(Of Integer))
        _scores = scores
    End Sub

    Public Function Scores() As List(Of Integer)
        Return _scores
    End Function

    Public Function Latest() As Integer
        ' Return the last score in the list
        Return _scores(_scores.Count - 1)
    End Function

    Public Function PersonalBest() As Integer
        ' Return the highest score
        Return _scores.Max()
    End Function

    Public Function PersonalTopThree() As List(Of Integer)
        ' Return the top three scores in descending order
        Return _scores.OrderByDescending(Function(score) score).Take(3).ToList()
    End Function
End Class
