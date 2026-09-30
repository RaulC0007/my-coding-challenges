WITH RECURSIVE flatten(rowid, value, type, order_num) AS (
    -- Base case: top-level elements with a sequential number
    SELECT 
        t.rowid,
        json_each.value,
        json_type(json_each.value),
        json_each.key AS order_num
    FROM "flatten-array" AS t,
         json_each(t.array)
    
    UNION ALL
    
    -- Recursive case: expand arrays and preserve order
    SELECT 
        f.rowid,
        nested.value,
        json_type(nested.value),
        f.order_num || '.' || nested.key
    FROM flatten f,
         json_each(f.value) AS nested
    WHERE f.type = 'array'
),
flattened AS (
    SELECT 
        rowid,
        json_group_array(
            CASE 
                WHEN type = 'null' OR value IS NULL THEN NULL
                ELSE value
            END
            ORDER BY order_num
        ) AS result
    FROM flatten
    WHERE type != 'array'
    GROUP BY rowid
)
UPDATE "flatten-array"
SET result = (
    SELECT json_group_array(jt.atom)
    FROM json_tree("flatten-array"."array") AS jt
    WHERE jt.atom IS NOT NULL
);
