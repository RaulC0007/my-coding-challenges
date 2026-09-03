UPDATE clock
SET result = CASE property
    WHEN 'create' THEN
        printf('%02d:%02d',
            (((CAST(json_extract(input, '$.hour') AS INTEGER) * 60 + CAST(json_extract(input, '$.minute') AS INTEGER)) % 1440) + 1440) % 1440 / 60,
            (((CAST(json_extract(input, '$.hour') AS INTEGER) * 60 + CAST(json_extract(input, '$.minute') AS INTEGER)) % 1440) + 1440) % 1440 % 60
        )
    WHEN 'add' THEN
        printf('%02d:%02d',
            (((CAST(json_extract(input, '$.hour') AS INTEGER) * 60 + CAST(json_extract(input, '$.minute') AS INTEGER) + CAST(json_extract(input, '$.value') AS INTEGER)) % 1440) + 1440) % 1440 / 60,
            (((CAST(json_extract(input, '$.hour') AS INTEGER) * 60 + CAST(json_extract(input, '$.minute') AS INTEGER) + CAST(json_extract(input, '$.value') AS INTEGER)) % 1440) + 1440) % 1440 % 60
        )
    WHEN 'subtract' THEN
        printf('%02d:%02d',
            (((CAST(json_extract(input, '$.hour') AS INTEGER) * 60 + CAST(json_extract(input, '$.minute') AS INTEGER) - CAST(json_extract(input, '$.value') AS INTEGER)) % 1440) + 1440) % 1440 / 60,
            (((CAST(json_extract(input, '$.hour') AS INTEGER) * 60 + CAST(json_extract(input, '$.minute') AS INTEGER) - CAST(json_extract(input, '$.value') AS INTEGER)) % 1440) + 1440) % 1440 % 60
        )
    WHEN 'equal' THEN
        CASE WHEN 
            (((CAST(json_extract(input, '$.clock1.hour') AS INTEGER) * 60 + CAST(json_extract(input, '$.clock1.minute') AS INTEGER)) % 1440) + 1440) % 1440 
            = 
            (((CAST(json_extract(input, '$.clock2.hour') AS INTEGER) * 60 + CAST(json_extract(input, '$.clock2.minute') AS INTEGER)) % 1440) + 1440) % 1440
        THEN 1 ELSE 0 END
END;