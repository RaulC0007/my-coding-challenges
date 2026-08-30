UPDATE raindrops 
SET sound = CASE 
    -- Check if divisible by 3, 5, or 7
    WHEN number % 3 = 0 OR number % 5 = 0 OR number % 7 = 0 THEN
        -- Build the sound string by concatenating the appropriate sounds
        CASE WHEN number % 3 = 0 THEN 'Pling' ELSE '' END ||
        CASE WHEN number % 5 = 0 THEN 'Plang' ELSE '' END ||
        CASE WHEN number % 7 = 0 THEN 'Plong' ELSE '' END
    ELSE
        -- If not divisible by 3, 5, or 7, return the number as a string
        CAST(number AS TEXT)
END;
