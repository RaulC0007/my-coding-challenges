WITH color_val(color, val) AS (
    VALUES 
    ('black', 0), ('brown', 1), ('red', 2), ('orange', 3), ('yellow', 4),
    ('green', 5), ('blue', 6), ('violet', 7), ('grey', 8), ('white', 9)
),
calculated AS (
    SELECT 
        c.rowid as rid,
        (v1.val * 10 + v2.val) * CAST(ROUND(POWER(10, v3.val)) AS INTEGER) as ohms
    FROM color_code c
    JOIN color_val v1 ON LOWER(c.color1) = v1.color
    JOIN color_val v2 ON LOWER(c.color2) = v2.color
    JOIN color_val v3 ON LOWER(c.color3) = v3.color
),
formatted AS (
    SELECT 
        rid,
        CASE 
            WHEN ohms >= 1000000000 AND ohms % 1000000000 = 0 THEN (ohms / 1000000000) || ' gigaohms'
            WHEN ohms >= 1000000 AND ohms % 1000000 = 0 THEN (ohms / 1000000) || ' megaohms'
            WHEN ohms >= 1000 AND ohms % 1000 = 0 THEN (ohms / 1000) || ' kiloohms'
            ELSE ohms || ' ohms'
        END as res_label
    FROM calculated
)
UPDATE color_code
SET result = (SELECT res_label FROM formatted WHERE formatted.rid = color_code.rowid);