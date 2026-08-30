UPDATE pangram 
SET result = CASE 
    -- Count distinct letters in the sentence (ignoring case)
    -- Compare to 26 (the number of letters in the English alphabet)
    WHEN (
        SELECT COUNT(DISTINCT letter)
        FROM (
            -- Extract each letter from the sentence
            WITH RECURSIVE letters(pos) AS (
                SELECT 1
                UNION ALL
                SELECT pos + 1
                FROM letters
                WHERE pos <= LENGTH(REPLACE(LOWER(sentence), ' ', ''))
            )
            SELECT SUBSTR(REPLACE(LOWER(sentence), ' ', ''), pos, 1) AS letter
            FROM letters
            WHERE SUBSTR(REPLACE(LOWER(sentence), ' ', ''), pos, 1) BETWEEN 'a' AND 'z'
        )
    ) = 26 THEN 1
    ELSE 0
END;