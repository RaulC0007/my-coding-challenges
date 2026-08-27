WITH RECURSIVE lyrics(rowid, start_bottles, take_down, current_bottle, verse_num, output) AS (
    -- Anchor: first verse
    SELECT 
        rowid,
        start_bottles,
        take_down,
        start_bottles,
        1,
        -- Generate the full verse text
        CASE start_bottles
            WHEN 1 THEN 'One green bottle hanging on the wall,'
            ELSE 
                CASE start_bottles
                    WHEN 2 THEN 'Two'
                    WHEN 3 THEN 'Three'
                    WHEN 4 THEN 'Four'
                    WHEN 5 THEN 'Five'
                    WHEN 6 THEN 'Six'
                    WHEN 7 THEN 'Seven'
                    WHEN 8 THEN 'Eight'
                    WHEN 9 THEN 'Nine'
                    WHEN 10 THEN 'Ten'
                END || ' green bottles hanging on the wall,'
        END || char(10) ||
        CASE start_bottles
            WHEN 1 THEN 'One green bottle hanging on the wall,'
            ELSE 
                CASE start_bottles
                    WHEN 2 THEN 'Two'
                    WHEN 3 THEN 'Three'
                    WHEN 4 THEN 'Four'
                    WHEN 5 THEN 'Five'
                    WHEN 6 THEN 'Six'
                    WHEN 7 THEN 'Seven'
                    WHEN 8 THEN 'Eight'
                    WHEN 9 THEN 'Nine'
                    WHEN 10 THEN 'Ten'
                END || ' green bottles hanging on the wall,'
        END || char(10) ||
        'And if one green bottle should accidentally fall,' || char(10) ||
        -- Fourth line with LOWERCASE numbers
        CASE (start_bottles - 1)
            WHEN 0 THEN 'There''ll be no green bottles hanging on the wall.'
            WHEN 1 THEN 'There''ll be one green bottle hanging on the wall.'
            ELSE 'There''ll be ' || 
                CASE (start_bottles - 1)
                    WHEN 2 THEN 'two'
                    WHEN 3 THEN 'three'
                    WHEN 4 THEN 'four'
                    WHEN 5 THEN 'five'
                    WHEN 6 THEN 'six'
                    WHEN 7 THEN 'seven'
                    WHEN 8 THEN 'eight'
                    WHEN 9 THEN 'nine'
                    WHEN 10 THEN 'ten'
                END || ' green bottles hanging on the wall.'
        END
    FROM "bottle-song"
    
    UNION ALL
    
    -- Recursive: next verse
    SELECT 
        l.rowid,
        l.start_bottles,
        l.take_down,
        l.current_bottle - 1,
        l.verse_num + 1,
        l.output || char(10) || char(10) ||
        -- First line with CAPITALIZED number
        CASE (l.current_bottle - 1)
            WHEN 1 THEN 'One green bottle hanging on the wall,'
            ELSE 
                CASE (l.current_bottle - 1)
                    WHEN 2 THEN 'Two'
                    WHEN 3 THEN 'Three'
                    WHEN 4 THEN 'Four'
                    WHEN 5 THEN 'Five'
                    WHEN 6 THEN 'Six'
                    WHEN 7 THEN 'Seven'
                    WHEN 8 THEN 'Eight'
                    WHEN 9 THEN 'Nine'
                    WHEN 10 THEN 'Ten'
                END || ' green bottles hanging on the wall,'
        END || char(10) ||
        -- Second line with CAPITALIZED number
        CASE (l.current_bottle - 1)
            WHEN 1 THEN 'One green bottle hanging on the wall,'
            ELSE 
                CASE (l.current_bottle - 1)
                    WHEN 2 THEN 'Two'
                    WHEN 3 THEN 'Three'
                    WHEN 4 THEN 'Four'
                    WHEN 5 THEN 'Five'
                    WHEN 6 THEN 'Six'
                    WHEN 7 THEN 'Seven'
                    WHEN 8 THEN 'Eight'
                    WHEN 9 THEN 'Nine'
                    WHEN 10 THEN 'Ten'
                END || ' green bottles hanging on the wall,'
        END || char(10) ||
        'And if one green bottle should accidentally fall,' || char(10) ||
        -- Fourth line with LOWERCASE number
        CASE (l.current_bottle - 2)
            WHEN 0 THEN 'There''ll be no green bottles hanging on the wall.'
            WHEN 1 THEN 'There''ll be one green bottle hanging on the wall.'
            ELSE 'There''ll be ' || 
                CASE (l.current_bottle - 2)
                    WHEN 2 THEN 'two'
                    WHEN 3 THEN 'three'
                    WHEN 4 THEN 'four'
                    WHEN 5 THEN 'five'
                    WHEN 6 THEN 'six'
                    WHEN 7 THEN 'seven'
                    WHEN 8 THEN 'eight'
                    WHEN 9 THEN 'nine'
                    WHEN 10 THEN 'ten'
                END || ' green bottles hanging on the wall.'
        END
    FROM lyrics l
    WHERE l.verse_num < l.take_down
)
UPDATE "bottle-song" 
SET result = (
    SELECT output
    FROM lyrics 
    WHERE lyrics.rowid = "bottle-song".rowid 
    ORDER BY verse_num DESC 
    LIMIT 1
);