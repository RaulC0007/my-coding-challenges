UPDATE "sum-of-multiples"
SET result = (
    SELECT COALESCE(SUM(n), 0)
    FROM (
        SELECT DISTINCT n
        FROM json_each("sum-of-multiples".factors) f,
             (
                 WITH RECURSIVE nums(n) AS (
                     SELECT 1 UNION ALL SELECT n + 1 FROM nums WHERE n < 10000
                 )
                 SELECT n FROM nums
             )
        WHERE f.value > 0
          AND n < "sum-of-multiples"."limit"
          AND n % f.value = 0
    )
);