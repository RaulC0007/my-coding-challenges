UPDATE "eliuds-eggs"
SET result = (
    SELECT 
        CASE 
            WHEN number = 0 THEN 0
            ELSE (number & 1) + 
                 ((number >> 1) & 1) + 
                 ((number >> 2) & 1) + 
                 ((number >> 3) & 1) + 
                 ((number >> 4) & 1) + 
                 ((number >> 5) & 1) + 
                 ((number >> 6) & 1) + 
                 ((number >> 7) & 1) + 
                 ((number >> 8) & 1) + 
                 ((number >> 9) & 1) + 
                 ((number >> 10) & 1) + 
                 ((number >> 11) & 1) + 
                 ((number >> 12) & 1) + 
                 ((number >> 13) & 1) + 
                 ((number >> 14) & 1) + 
                 ((number >> 15) & 1) + 
                 ((number >> 16) & 1) + 
                 ((number >> 17) & 1) + 
                 ((number >> 18) & 1) + 
                 ((number >> 19) & 1) + 
                 ((number >> 20) & 1) + 
                 ((number >> 21) & 1) + 
                 ((number >> 22) & 1) + 
                 ((number >> 23) & 1) + 
                 ((number >> 24) & 1) + 
                 ((number >> 25) & 1) + 
                 ((number >> 26) & 1) + 
                 ((number >> 27) & 1) + 
                 ((number >> 28) & 1) + 
                 ((number >> 29) & 1) + 
                 ((number >> 30) & 1)
        END
);