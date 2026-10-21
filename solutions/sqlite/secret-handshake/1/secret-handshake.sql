UPDATE "secret-handshake"
SET result = (
    SELECT 
        CASE 
            WHEN (number & 16) = 0 THEN
                CASE 
                    WHEN (number & 15) = 1 THEN 'wink'
                    WHEN (number & 15) = 2 THEN 'double blink'
                    WHEN (number & 15) = 3 THEN 'wink, double blink'
                    WHEN (number & 15) = 4 THEN 'close your eyes'
                    WHEN (number & 15) = 5 THEN 'wink, close your eyes'
                    WHEN (number & 15) = 6 THEN 'double blink, close your eyes'
                    WHEN (number & 15) = 7 THEN 'wink, double blink, close your eyes'
                    WHEN (number & 15) = 8 THEN 'jump'
                    WHEN (number & 15) = 9 THEN 'wink, jump'
                    WHEN (number & 15) = 10 THEN 'double blink, jump'
                    WHEN (number & 15) = 11 THEN 'wink, double blink, jump'
                    WHEN (number & 15) = 12 THEN 'close your eyes, jump'
                    WHEN (number & 15) = 13 THEN 'wink, close your eyes, jump'
                    WHEN (number & 15) = 14 THEN 'double blink, close your eyes, jump'
                    WHEN (number & 15) = 15 THEN 'wink, double blink, close your eyes, jump'
                    ELSE ''
                END
            ELSE
                CASE 
                    WHEN (number & 15) = 1 THEN 'wink'
                    WHEN (number & 15) = 2 THEN 'double blink'
                    WHEN (number & 15) = 3 THEN 'double blink, wink'
                    WHEN (number & 15) = 4 THEN 'close your eyes'
                    WHEN (number & 15) = 5 THEN 'close your eyes, wink'
                    WHEN (number & 15) = 6 THEN 'close your eyes, double blink'
                    WHEN (number & 15) = 7 THEN 'close your eyes, double blink, wink'
                    WHEN (number & 15) = 8 THEN 'jump'
                    WHEN (number & 15) = 9 THEN 'jump, wink'
                    WHEN (number & 15) = 10 THEN 'jump, double blink'
                    WHEN (number & 15) = 11 THEN 'jump, double blink, wink'
                    WHEN (number & 15) = 12 THEN 'jump, close your eyes'
                    WHEN (number & 15) = 13 THEN 'jump, close your eyes, wink'
                    WHEN (number & 15) = 14 THEN 'jump, close your eyes, double blink'
                    WHEN (number & 15) = 15 THEN 'jump, close your eyes, double blink, wink'
                    ELSE ''
                END
        END
);