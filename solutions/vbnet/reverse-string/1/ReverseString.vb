Imports System
Imports System.Globalization
Imports System.Collections.Generic
Imports System.Text

Public Module ReverseString
    Public Function Reverse(ByVal inputString As String) As String
        If String.IsNullOrEmpty(inputString) Then
            Return inputString
        End If

        Dim charEnum As TextElementEnumerator = StringInfo.GetTextElementEnumerator(inputString)
        Dim elements As New List(Of String)()
        
        While charEnum.MoveNext()
            elements.Add(charEnum.GetTextElement())
        End While

        elements.Reverse()
        
        Dim sb As New StringBuilder()
        For Each elem As String In elements
            sb.Append(elem)
        Next

        Return sb.ToString()
    End Function
End Module