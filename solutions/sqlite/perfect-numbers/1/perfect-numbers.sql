-- 1. Handle invalid input (zero or negative numbers)
UPDATE "perfect-numbers"
SET error = 'Classification is only possible for positive integers.'
WHERE number <= 0;

-- 2. Calculate the classification for valid positive numbers
UPDATE "perfect-numbers"
SET result = (
    WITH RECURSIVE
    -- Generate numbers from 1 up to the square root of the target number
    divisors(d) AS (
        VALUES (1)
        UNION ALL
        SELECT d + 1 FROM divisors WHERE (d + 1) * (d + 1) <= number
    ),
    -- For each divisor, add both the divisor and its pair (number / divisor).
    -- Using UNION automatically deduplicates in case of perfect squares (e.g., 4 * 4 = 16).
    factors(f) AS (
        SELECT d FROM divisors WHERE number % d = 0
        UNION
        SELECT number / d FROM divisors WHERE number % d = 0
    )
    -- The sum of all factors includes the number itself. 
    -- Therefore, aliquot sum = sum(f) - number.
    -- We compare (sum(f) - number) to the original number, 
    -- which is mathematically equivalent to comparing sum(f) to 2 * number.
    SELECT 
        CASE sign((SELECT sum(f) FROM factors) - 2 * number)
            WHEN 1 THEN 'abundant'
            WHEN 0 THEN 'perfect'
            ELSE 'deficient'
        END
)
WHERE number > 0;