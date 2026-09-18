Public Enum Classification
    Perfect
    Abundant
    Deficient
End Enum

Public Module PerfectNumbers
    Public Function Classify(ByVal number As Integer) As Classification
        If number <= 0 Then
            Throw New ArgumentOutOfRangeException("number", "Only positive integers are allowed.")
        End If

        Dim aliquotSum As Integer = 0

        ' Calcular la suma alícuota (suma de los divisores propios excluyendo al propio número)
        For i As Integer = 1 To number - 1
            If number Mod i = 0 Then
                aliquotSum += i
            End If
        Next

        ' Clasificar según la comparación con la suma alícuota
        If aliquotSum = number Then
            Return Classification.Perfect
        ElseIf aliquotSum > number Then
            Return Classification.Abundant
        Else
            Return Classification.Deficient
        End If
    End Function
End Module