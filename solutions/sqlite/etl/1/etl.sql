UPDATE "etl"
SET result = (
    SELECT json_group_object(
        lower(letter), 
        CAST(score AS INTEGER)
    )
    FROM (
        SELECT 
            score.key AS score,
            letter.value AS letter
        FROM json_each("etl"."input") AS score,
             json_each(score.value) AS letter
        ORDER BY lower(letter.value) ASC
    )
);