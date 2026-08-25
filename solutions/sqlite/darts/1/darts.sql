UPDATE darts 
SET score = CASE 
    -- Calculate distance from center: sqrt(x^2 + y^2)
    WHEN (x * x + y * y) > 100 THEN 0   -- Outside outer circle (radius 10)
    WHEN (x * x + y * y) > 25 THEN 1    -- Outer circle (radius 10, outside radius 5)
    WHEN (x * x + y * y) > 1 THEN 5     -- Middle circle (radius 5, outside radius 1)
    ELSE 10                              -- Inner circle (radius 1) - bullseye
END;