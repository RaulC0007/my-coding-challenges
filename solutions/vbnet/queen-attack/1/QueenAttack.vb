Imports System

Public Class Queen
    Public Sub New(ByVal row As Integer, ByVal column As Integer)
        If row < 0 OrElse row > 7 OrElse column < 0 OrElse column > 7 Then
            Throw New ArgumentOutOfRangeException("Position must be on the 8x8 chessboard (0-7).")
        End If
        Me.Row = row
        Me.Column = column
    End Sub

    Public ReadOnly Property Row As Integer
    Public ReadOnly Property Column As Integer
End Class

Public Module QueenAttack
    Public Function CanAttack(ByVal white As Queen, ByVal black As Queen) As Boolean
        ' Misma fila o misma columna
        If white.Row = black.Row OrElse white.Column = black.Column Then
            Return True
        End If

        ' Misma diagonal (la diferencia absoluta en filas es igual a la diferencia absoluta en columnas)
        If Math.Abs(white.Row - black.Row) = Math.Abs(white.Column - black.Column) Then
            Return True
        End If

        Return False
    End Function

    Public Function Create(ByVal row As Integer, ByVal column As Integer) As Queen
        Return New Queen(row, column)
    End Function
End Module