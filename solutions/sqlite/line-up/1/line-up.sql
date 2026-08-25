UPDATE "line-up" 
SET result = name || ', you are the ' || 
    number || 
    CASE 
        -- Special case for numbers ending in 11, 12, 13
        WHEN number % 100 IN (11, 12, 13) THEN 'th'
        -- Numbers ending in 1 → "st"
        WHEN number % 10 = 1 THEN 'st'
        -- Numbers ending in 2 → "nd"
        WHEN number % 10 = 2 THEN 'nd'
        -- Numbers ending in 3 → "rd"
        WHEN number % 10 = 3 THEN 'rd'
        -- All other numbers → "th"
        ELSE 'th'
    END || 
    ' customer we serve today. Thank you!';