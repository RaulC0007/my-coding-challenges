Public Module BinarySearch
    Public Function Find(ByVal input As Integer(), ByVal value As Integer) As Integer
        ' Handle empty array or null array
        If input Is Nothing OrElse input.Length = 0 Then
            Return -1
        End If
        
        Dim left As Integer = 0
        Dim right As Integer = input.Length - 1
        
        While left <= right
            ' Find the middle index
            Dim mid As Integer = left + (right - left) \ 2
            
            ' Check if the middle element is the value we're looking for
            If input(mid) = value Then
                Return mid
            End If
            
            ' If the value is greater than the middle element, search the right half
            If input(mid) < value Then
                left = mid + 1
            Else
                ' If the value is less than the middle element, search the left half
                right = mid - 1
            End If
        End While
        
        ' Value not found - return -1
        Return -1
    End Function
End Module