UPDATE leap 
SET is_leap = CASE 
    -- A year is a leap year if:
    -- 1. It is divisible by 4
    -- 2. AND it is NOT divisible by 100, OR it is divisible by 400
    WHEN year % 4 = 0 AND (year % 100 != 0 OR year % 400 = 0) THEN 1
    ELSE 0
END;