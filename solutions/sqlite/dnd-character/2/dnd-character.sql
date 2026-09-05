UPDATE "dnd-character"
SET 
    strength = CASE 
        WHEN property = 'character' AND json_valid(input) THEN json_extract(input, '$.strength')
        ELSE strength 
    END,
    dexterity = CASE 
        WHEN property = 'character' AND json_valid(input) THEN json_extract(input, '$.dexterity')
        ELSE dexterity 
    END,
    constitution = CASE 
        WHEN property = 'character' AND json_valid(input) THEN json_extract(input, '$.constitution')
        ELSE constitution 
    END,
    intelligence = CASE 
        WHEN property = 'character' AND json_valid(input) THEN json_extract(input, '$.intelligence')
        ELSE intelligence 
    END,
    wisdom = CASE 
        WHEN property = 'character' AND json_valid(input) THEN json_extract(input, '$.wisdom')
        ELSE wisdom 
    END,
    charisma = CASE 
        WHEN property = 'character' AND json_valid(input) THEN json_extract(input, '$.charisma')
        ELSE charisma 
    END,
    modifier = CASE 
        WHEN property = 'modifier' AND input = 'score' THEN
            CASE 
                WHEN (CAST(constitution AS INTEGER) - 10) < 0 AND (CAST(constitution AS INTEGER) - 10) % 2 != 0 
                THEN ((CAST(constitution AS INTEGER) - 10) / 2) - 1 
                ELSE (CAST(constitution AS INTEGER) - 10) / 2 
            END
        WHEN property = 'character' AND json_valid(input) THEN
            CASE 
                WHEN (CAST(json_extract(input, '$.constitution') AS INTEGER) - 10) < 0 AND (CAST(json_extract(input, '$.constitution') AS INTEGER) - 10) % 2 != 0 
                THEN ((CAST(json_extract(input, '$.constitution') AS INTEGER) - 10) / 2) - 1 
                ELSE (CAST(json_extract(input, '$.constitution') AS INTEGER) - 10) / 2 
            END
        ELSE modifier
    END,
    hitpoints = CASE 
        WHEN property = 'character' AND json_valid(input) THEN
            10 + CASE 
                WHEN (CAST(json_extract(input, '$.constitution') AS INTEGER) - 10) < 0 AND (CAST(json_extract(input, '$.constitution') AS INTEGER) - 10) % 2 != 0 
                THEN ((CAST(json_extract(input, '$.constitution') AS INTEGER) - 10) / 2) - 1 
                ELSE (CAST(json_extract(input, '$.constitution') AS INTEGER) - 10) / 2 
            END
        ELSE hitpoints
    END
WHERE property IN ('modifier', 'ability', 'character');
-- Fix column types
