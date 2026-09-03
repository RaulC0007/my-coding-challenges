UPDATE triangle 
SET result = CASE property
    WHEN 'equilateral' THEN
        -- All three sides must be equal and greater than 0
        side_a > 0 AND side_b > 0 AND side_c > 0
        AND side_a = side_b AND side_b = side_c
    
    WHEN 'isosceles' THEN
        -- At least two sides equal, all sides > 0, and triangle inequality holds
        side_a > 0 AND side_b > 0 AND side_c > 0
        AND side_a + side_b >= side_c
        AND side_b + side_c >= side_a
        AND side_a + side_c >= side_b
        AND (side_a = side_b OR side_b = side_c OR side_a = side_c)
    
    WHEN 'scalene' THEN
        -- All sides different, all sides > 0, and triangle inequality holds
        side_a > 0 AND side_b > 0 AND side_c > 0
        AND side_a + side_b >= side_c
        AND side_b + side_c >= side_a
        AND side_a + side_c >= side_b
        AND side_a != side_b AND side_b != side_c AND side_a != side_c
    
    ELSE FALSE
END;