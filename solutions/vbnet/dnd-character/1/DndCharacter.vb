Imports System

Public Class DndCharacter
    Public ReadOnly Property Strength As Integer
    Public ReadOnly Property Dexterity As Integer
    Public ReadOnly Property Constitution As Integer
    Public ReadOnly Property Intelligence As Integer
    Public ReadOnly Property Wisdom As Integer
    Public ReadOnly Property Charisma As Integer
    Public ReadOnly Property Hitpoints As Integer

    Private Shared ReadOnly Rng As New Random()

    Public Sub New(strengthVal As Integer, dexterityVal As Integer, constitutionVal As Integer,
                   intelligenceVal As Integer, wisdomVal As Integer, charismaVal As Integer,
                   hitpointsVal As Integer)
        Strength = strengthVal
        Dexterity = dexterityVal
        Constitution = constitutionVal
        Intelligence = intelligenceVal
        Wisdom = wisdomVal
        Charisma = charismaVal
        Hitpoints = hitpointsVal
    End Sub

    Public Shared Function Modifier(ByVal score As Integer) As Integer
        Return CInt(Math.Floor((score - 10) / 2.0))
    End Function

    Public Shared Function Ability() As Integer
        Dim rolls(3) As Integer
        For i As Integer = 0 To 3
            rolls(i) = Rng.Next(1, 7)
        Next

        Array.Sort(rolls)
        ' Sum the three largest, discarding the smallest (index 0 after sorting)
        Return rolls(1) + rolls(2) + rolls(3)
    End Function

    Public Shared Function Generate() As DndCharacter
        Dim strengthVal As Integer = Ability()
        Dim dexterityVal As Integer = Ability()
        Dim constitutionVal As Integer = Ability()
        Dim intelligenceVal As Integer = Ability()
        Dim wisdomVal As Integer = Ability()
        Dim charismaVal As Integer = Ability()
        Dim hitpointsVal As Integer = 10 + Modifier(constitutionVal)

        Return New DndCharacter(strengthVal, dexterityVal, constitutionVal, intelligenceVal, wisdomVal, charismaVal, hitpointsVal)
    End Function
End Class