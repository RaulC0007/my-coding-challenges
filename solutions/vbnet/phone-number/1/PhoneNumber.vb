Imports System.Text.RegularExpressions

Public Class PhoneNumber
    Public Shared Function Clean(ByVal phoneNumber As String) As String
        ' Remover todos los caracteres que no sean dígitos
        Dim digits As String = Regex.Replace(phoneNumber, "\D", "")

        ' Si tiene 11 dígitos y empieza con 1, remover el código de país
        If digits.Length = 11 Then
            If digits.StartsWith("1") Then
                digits = digits.Substring(1)
            Else
                Throw New ArgumentException("Invalid country code.")
            End If
        End If

        ' Validar que la longitud final sea exactamente de 10 dígitos
        If digits.Length <> 10 Then
            Throw New ArgumentException("Invalid number of digits.")
        End If

        ' Validar que el código de área (NXX) y el código de intercambio (NXX) 
        ' no comiencen con 0 ni con 1 (N debe ser un dígito del 2 al 9).
        Dim areaCodeFirst As Char = digits(0)
        Dim exchangeCodeFirst As Char = digits(3)

        If areaCodeFirst = "0"c OrElse areaCodeFirst = "1"c Then
            Throw New ArgumentException("Invalid area code.")
        End If

        If exchangeCodeFirst = "0"c OrElse exchangeCodeFirst = "1"c Then
            Throw New ArgumentException("Invalid exchange code.")
        End If

        Return digits
    End Function
End Class