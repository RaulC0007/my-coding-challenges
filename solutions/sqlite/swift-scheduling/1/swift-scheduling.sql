UPDATE "swift-scheduling"
SET result = (
    SELECT 
        CASE s.date_description
            -- 1. NOW: Two hours after the meeting started (formatted with 'T')
            WHEN 'NOW' THEN strftime('%Y-%m-%dT%H:%M:%S', s.meeting_start, '+2 hours')

            -- 2. ASAP: Before 13:00 -> Today at 17:00; After or at 13:00 -> Tomorrow at 13:00
            WHEN 'ASAP' THEN
                CASE 
                    WHEN time(s.meeting_start) < '13:00' THEN date(s.meeting_start) || 'T17:00:00'
                    ELSE date(s.meeting_start, '+1 day') || 'T13:00:00'
                END

            -- 3. EOW: Mon-Wed -> Friday at 17:00; Thu-Fri -> Sunday at 20:00
            WHEN 'EOW' THEN
                CASE 
                    WHEN strftime('%w', s.meeting_start) IN ('1', '2', '3') THEN date(s.meeting_start, 'weekday 5') || 'T17:00:00'
                    ELSE date(s.meeting_start, 'weekday 0') || 'T20:00:00'
                END

            ELSE
                CASE 
                    -- 4. Variable <N>M (N-th month)
                    WHEN s.date_description GLOB '[0-9]*M' THEN (
                        WITH params AS (
                            SELECT 
                                CAST(REPLACE(s.date_description, 'M', '') AS INTEGER) as n,
                                strftime('%Y', s.meeting_start) as yr
                        ),
                        target AS (
                            SELECT 
                                CASE 
                                    WHEN s.meeting_start < printf('%04d-%02d-01T00:00:00', yr, n) THEN CAST(yr AS INTEGER)
                                    ELSE CAST(yr AS INTEGER) + 1
                                END as ty,
                                n as tn
                            FROM params
                        ),
                        first_day AS (
                            SELECT printf('%04d-%02d-01', ty, tn) as fd FROM target
                        ),
                        first_workday AS (
                            SELECT 
                                CASE strftime('%w', fd)
                                    WHEN '6' THEN date(fd, '+2 days')
                                    WHEN '0' THEN date(fd, '+1 day')
                                    ELSE fd
                                END as fwd
                            FROM first_day
                        )
                        SELECT fwd || 'T08:00:00' FROM first_workday
                    )

                    -- 5. Variable Q<N> (N-th quarter)
                    WHEN s.date_description GLOB 'Q[0-9]' THEN (
                        WITH params AS (
                            SELECT 
                                CAST(SUBSTR(s.date_description, 2, 1) AS INTEGER) as q,
                                strftime('%Y', s.meeting_start) as yr
                        ),
                        target AS (
                            SELECT 
                                q * 3 as last_month,
                                CASE 
                                    WHEN q = 1 AND s.meeting_start <= printf('%04d-03-31T23:59:59', yr) THEN CAST(yr AS INTEGER)
                                    WHEN q = 2 AND s.meeting_start <= printf('%04d-06-30T23:59:59', yr) THEN CAST(yr AS INTEGER)
                                    WHEN q = 3 AND s.meeting_start <= printf('%04d-09-30T23:59:59', yr) THEN CAST(yr AS INTEGER)
                                    WHEN q = 4 AND s.meeting_start <= printf('%04d-12-31T23:59:59', yr) THEN CAST(yr AS INTEGER)
                                    ELSE CAST(yr AS INTEGER) + 1
                                END as ty
                            FROM params
                        ),
                        quarter_end AS (
                            SELECT 
                                ty,
                                last_month,
                                CASE last_month
                                    WHEN 3  THEN printf('%04d-03-31', ty)
                                    WHEN 6  THEN printf('%04d-06-30', ty)
                                    WHEN 9  THEN printf('%04d-09-30', ty)
                                    WHEN 12 THEN printf('%04d-12-31', ty)
                                END as led
                            FROM target
                        ),
                        last_workday AS (
                            SELECT 
                                CASE strftime('%w', led)
                                    WHEN '6' THEN date(led, '-1 day')
                                    WHEN '0' THEN date(led, '-2 days')
                                    ELSE led
                                END as lwd
                            FROM quarter_end
                        )
                        SELECT lwd || 'T08:00:00' FROM last_workday
                    )
                END
        END
    FROM "swift-scheduling" s
    WHERE s.rowid = "swift-scheduling".rowid
);