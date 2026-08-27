UPDATE "difference-of-squares" 
SET result = CASE 
    -- Square of the sum: (n * (n + 1) / 2)²
    WHEN property = 'squareOfSum' THEN (number * (number + 1) / 2) * (number * (number + 1) / 2)
    
    -- Sum of squares: n * (n + 1) * (2n + 1) / 6
    WHEN property = 'sumOfSquares' THEN number * (number + 1) * (2 * number + 1) / 6
    
    -- Difference of squares: squareOfSum - sumOfSquares
    WHEN property = 'differenceOfSquares' THEN 
        ((number * (number + 1) / 2) * (number * (number + 1) / 2)) - 
        (number * (number + 1) * (2 * number + 1) / 6)
END;