Imports System.Linq

Public Module DifferenceOfSquares
    Public Function CalculateSquareOfSum(ByVal max As Integer) As Integer
        ' Sum of first n natural numbers: n * (n + 1) / 2
        Dim sum As Integer = max * (max + 1) / 2
        Return sum * sum
    End Function

    Public Function CalculateSumOfSquares(ByVal max As Integer) As Integer
        ' Sum of squares of first n natural numbers: n * (n + 1) * (2n + 1) / 6
        Return max * (max + 1) * (2 * max + 1) / 6
    End Function

    Public Function CalculateDifferenceOfSquares(ByVal max As Integer) As Integer
        Return CalculateSquareOfSum(max) - CalculateSumOfSquares(max)
    End Function
End Module