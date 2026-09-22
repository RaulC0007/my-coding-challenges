UPDATE allergies 
SET result = CASE task
    WHEN 'allergicTo' THEN
        CASE 
            WHEN (score & 
                CASE item
                    WHEN 'eggs' THEN 1
                    WHEN 'peanuts' THEN 2
                    WHEN 'shellfish' THEN 4
                    WHEN 'strawberries' THEN 8
                    WHEN 'tomatoes' THEN 16
                    WHEN 'chocolate' THEN 32
                    WHEN 'pollen' THEN 64
                    WHEN 'cats' THEN 128
                END
            ) > 0 THEN 'true'
            ELSE 'false'
        END
    
    WHEN 'list' THEN
        -- Build the list with comma separators and remove trailing comma
        RTRIM(
            CASE WHEN (score & 1) > 0 THEN 'eggs, ' ELSE '' END ||
            CASE WHEN (score & 2) > 0 THEN 'peanuts, ' ELSE '' END ||
            CASE WHEN (score & 4) > 0 THEN 'shellfish, ' ELSE '' END ||
            CASE WHEN (score & 8) > 0 THEN 'strawberries, ' ELSE '' END ||
            CASE WHEN (score & 16) > 0 THEN 'tomatoes, ' ELSE '' END ||
            CASE WHEN (score & 32) > 0 THEN 'chocolate, ' ELSE '' END ||
            CASE WHEN (score & 64) > 0 THEN 'pollen, ' ELSE '' END ||
            CASE WHEN (score & 128) > 0 THEN 'cats, ' ELSE '' END,
            ', '
        )
    
    ELSE ''
END;