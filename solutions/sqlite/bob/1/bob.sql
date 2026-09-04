UPDATE bob 
SET reply = 
    CASE 
        -- Silence (empty string or only whitespace characters)
        -- Use TRIM to remove spaces, and also handle other whitespace
        WHEN TRIM(input, ' 	
') = '' THEN 'Fine. Be that way!'
        
        -- Yelling a question (all caps, contains letter, ends with ?)
        WHEN input = UPPER(input) 
             AND input GLOB '*[A-Z]*' 
             AND TRIM(input) LIKE '%?' 
             THEN 'Calm down, I know what I''m doing!'
        
        -- Yelling (all caps, contains letter)
        WHEN input = UPPER(input) 
             AND input GLOB '*[A-Z]*' 
             THEN 'Whoa, chill out!'
        
        -- Question (ends with ?)
        WHEN TRIM(input) LIKE '%?' THEN 'Sure.'
        
        -- Everything else
        ELSE 'Whatever.'
    END;