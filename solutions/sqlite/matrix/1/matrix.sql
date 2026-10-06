UPDATE matrix
SET result = (
    WITH parsed AS (
        SELECT '[[' || replace(replace(string, char(10), '],['), ' ', ',') || ']]' AS json_matrix
    )
    SELECT
        CASE property
            WHEN 'row' THEN
                json_extract(json_matrix, '$[' || ("index" - 1) || ']')
            WHEN 'column' THEN
                (
                    SELECT json_group_array(
                        json_extract(je.value, '$[' || ("index" - 1) || ']')
                    )
                    FROM parsed, json_each(json_matrix) AS je
                )
        END
    FROM parsed
);

