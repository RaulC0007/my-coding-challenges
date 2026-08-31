Public Module Gigasecond
    Public Function Add(ByVal moment As Date) As Date
        ' A gigasecond is 1,000,000,000 seconds
        Return moment.AddSeconds(1000000000)
    End Function
End Module