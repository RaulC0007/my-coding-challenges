WITH orbital_periods AS (
    SELECT 'Mercury' AS planet, 0.2408467 AS period UNION ALL
    SELECT 'Venus',   0.61519726 UNION ALL
    SELECT 'Earth',   1.0 UNION ALL
    SELECT 'Mars',    1.8808158 UNION ALL
    SELECT 'Jupiter', 11.862615 UNION ALL
    SELECT 'Saturn',  29.447498 UNION ALL
    SELECT 'Uranus',  84.016846 UNION ALL
    SELECT 'Neptune', 164.79132
)
UPDATE "space-age" 
SET result = ROUND(
    seconds / 31557600.0 / (
        SELECT period 
        FROM orbital_periods 
        WHERE orbital_periods.planet = "space-age".planet
    ),
    2
);