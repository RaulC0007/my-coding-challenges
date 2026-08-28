UPDATE "isbn-verifier" 
SET result = CASE 
    -- Remove hyphens and check length
    WHEN LENGTH(REPLACE(isbn, '-', '')) != 10 THEN 0
    
    -- Validate characters: first 9 digits, last digit or X
    WHEN REPLACE(isbn, '-', '') NOT GLOB '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9X]' THEN 0
    
    -- Calculate weighted sum directly
    ELSE (
        (CAST(SUBSTR(REPLACE(isbn, '-', ''), 1, 1) AS INTEGER) * 10 +
         CAST(SUBSTR(REPLACE(isbn, '-', ''), 2, 1) AS INTEGER) * 9 +
         CAST(SUBSTR(REPLACE(isbn, '-', ''), 3, 1) AS INTEGER) * 8 +
         CAST(SUBSTR(REPLACE(isbn, '-', ''), 4, 1) AS INTEGER) * 7 +
         CAST(SUBSTR(REPLACE(isbn, '-', ''), 5, 1) AS INTEGER) * 6 +
         CAST(SUBSTR(REPLACE(isbn, '-', ''), 6, 1) AS INTEGER) * 5 +
         CAST(SUBSTR(REPLACE(isbn, '-', ''), 7, 1) AS INTEGER) * 4 +
         CAST(SUBSTR(REPLACE(isbn, '-', ''), 8, 1) AS INTEGER) * 3 +
         CAST(SUBSTR(REPLACE(isbn, '-', ''), 9, 1) AS INTEGER) * 2 +
         CASE 
             WHEN SUBSTR(REPLACE(isbn, '-', ''), 10, 1) = 'X' THEN 10 
             ELSE CAST(SUBSTR(REPLACE(isbn, '-', ''), 10, 1) AS INTEGER) 
         END * 1) % 11 = 0
    )
END;