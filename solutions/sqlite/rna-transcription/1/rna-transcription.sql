WITH RECURSIVE transcribe(dna, pos, result) AS (
    -- Base case: start with position 1
    SELECT dna, 1, '' 
    FROM "rna-transcription"
    
    UNION ALL
    
    -- Recursive case: process each character
    SELECT 
        dna, 
        pos + 1,
        result || 
        CASE SUBSTR(dna, pos, 1)
            WHEN 'G' THEN 'C'
            WHEN 'C' THEN 'G'
            WHEN 'T' THEN 'A'
            WHEN 'A' THEN 'U'
            ELSE ''  -- Skip invalid characters (or handle as needed)
        END
    FROM transcribe
    WHERE pos <= LENGTH(dna)
)
UPDATE "rna-transcription" 
SET result = (
    SELECT result 
    FROM transcribe 
    WHERE transcribe.dna = "rna-transcription".dna 
    ORDER BY pos DESC 
    LIMIT 1
);