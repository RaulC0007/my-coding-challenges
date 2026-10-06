UPDATE "grade-school"
SET result = (
    WITH students AS (
        SELECT 
            value ->> '$[0]' AS name,
            value ->> '$[1]' AS grade,
            key AS idx
        FROM json_each(input -> '$.students')
    ),
    first_add AS (
        SELECT 
            name,
            grade,
            idx,
            (idx = MIN(idx) OVER (PARTITION BY name)) AS was_added
        FROM students
    )
    SELECT 
        CASE property
            WHEN 'roster' THEN (
                SELECT json_group_array(name)
                FROM (
                    SELECT name, grade
                    FROM first_add
                    WHERE was_added
                    ORDER BY grade, name
                )
            )
            WHEN 'grade' THEN (
                SELECT json_group_array(name)
                FROM (
                    SELECT name
                    FROM first_add
                    WHERE was_added AND grade = (input ->> '$.desiredGrade')
                    ORDER BY name
                )
            )
            WHEN 'add' THEN (
                SELECT json_group_array(
                    CASE WHEN was_added THEN json('true') ELSE json('false') END
                )
                FROM (
                    SELECT was_added
                    FROM first_add
                    ORDER BY idx
                )
            )
        END
)
WHERE property IN ('roster', 'grade', 'add');