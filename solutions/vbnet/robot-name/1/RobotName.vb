Imports System
Imports System.Collections.Generic

Public Class Robot
    Private Shared ReadOnly _usedNames As New HashSet(Of String)()
    Private Shared ReadOnly _random As New Random()
    Private _name As String

    Public ReadOnly Property Name As String
        Get
            If String.IsNullOrEmpty(_name) Then
                _name = GenerateUniqueName()
            End If
            Return _name
        End Get
    End Property

    Public Sub Reset()
        If Not String.IsNullOrEmpty(_name) Then
            SyncLock _usedNames
                _usedNames.Remove(_name)
            End SyncLock
            _name = Nothing
        End If
    End Sub

    Private Shared Function GenerateUniqueName() As String
        SyncLock _usedNames
            ' El espacio total de nombres posibles es 26 * 26 * 10 * 10 * 10 = 676,000
            If _usedNames.Count >= 676000 Then
                Throw New InvalidOperationException("All possible robot names have been exhausted.")
            End If

            Dim newName As String
            Do
                Dim letters As Char() = {
                    Chr(Asc("A"c) + _random.Next(26)),
                    Chr(Asc("A"c) + _random.Next(26))
                }
                Dim digits As String = _random.Next(1000).ToString("D3")
                newName = New String(letters) & digits
            Loop While _usedNames.Contains(newName)

            _usedNames.Add(newName)
            Return newName
        End SyncLock
    End Function
End Class
