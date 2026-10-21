UPDATE "square-root"
SET result = (
    SELECT g FROM (
        WITH RECURSIVE guess(g) AS (
            SELECT 1
            UNION ALL
            SELECT g + 1 FROM guess WHERE (g + 1) * (g + 1) <= "square-root".radicand
        )
        SELECT g FROM guess ORDER BY g DESC LIMIT 1
    )
    WHERE g * g = "square-root".radicand
);