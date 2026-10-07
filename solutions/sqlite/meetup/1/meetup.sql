-- Corrected version
WITH RECURSIVE calendar AS (
    -- Generate all days in the month for each row
    SELECT 
        m.rowid,
        m.year,
        m.month,
        m.week,
        m.dayofweek,
        date(m.year || '-' || printf('%02d', m.month) || '-01') AS current_date,
        1 AS day_num
    FROM meetup m
    
    UNION ALL
    
    SELECT 
        c.rowid,
        c.year,
        c.month,
        c.week,
        c.dayofweek,
        date(c.current_date, '+1 day'),
        c.day_num + 1
    FROM calendar c
    WHERE c.day_num < CAST(
        strftime('%d', 
            date(
                date(c.year || '-' || printf('%02d', c.month) || '-01'),
                'start of month',
                '+1 month',
                '-1 day'
            )
        ) AS INTEGER
    )
),
dow_map AS (
    SELECT 'Sunday' AS name, 0 AS num UNION ALL
    SELECT 'Monday', 1 UNION ALL
    SELECT 'Tuesday', 2 UNION ALL
    SELECT 'Wednesday', 3 UNION ALL
    SELECT 'Thursday', 4 UNION ALL
    SELECT 'Friday', 5 UNION ALL
    SELECT 'Saturday', 6
),
month_days AS (
    SELECT 
        c.rowid,
        c.year,
        c.month,
        c.week,
        c.dayofweek,
        c.current_date,
        c.day_num,
        CAST(strftime('%w', c.current_date) AS INTEGER) AS dow,
        ROW_NUMBER() OVER (PARTITION BY c.rowid, c.dayofweek ORDER BY c.day_num) AS occ,
        COUNT(*) OVER (PARTITION BY c.rowid, c.dayofweek) AS total
    FROM calendar c
    JOIN dow_map d ON d.name = c.dayofweek
    WHERE CAST(strftime('%w', c.current_date) AS INTEGER) = d.num
)
UPDATE meetup
SET result = (
    SELECT m.current_date
    FROM month_days m
    WHERE m.rowid = meetup.rowid
      AND CASE meetup.week
          WHEN 'first' THEN m.occ = 1
          WHEN 'second' THEN m.occ = 2
          WHEN 'third' THEN m.occ = 3
          WHEN 'fourth' THEN m.occ = 4
          WHEN 'last' THEN m.occ = m.total
          WHEN 'teenth' THEN m.day_num BETWEEN 13 AND 19
          ELSE FALSE
      END
);