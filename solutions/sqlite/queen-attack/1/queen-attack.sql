-- 1. Validate positions with the exact expected error messages
UPDATE "queen-attack"
SET error = CASE
    WHEN white_row < 0 OR black_row < 0 THEN 'row not positive'
    WHEN white_col < 0 OR black_col < 0 THEN 'column not positive'
    WHEN white_row > 7 OR black_row > 7 THEN 'row not on board'
    WHEN white_col > 7 OR black_col > 7 THEN 'column not on board'
    ELSE NULL
END;

-- 2. Calculate if the queens can attack each other
UPDATE "queen-attack"
SET result = CASE
    -- If there's an error, the result should remain NULL
    WHEN error IS NOT NULL THEN NULL
    
    -- Queens attack if they share a row, column, or diagonal.
    -- (This naturally covers the "same square" case where result should be 1)
    WHEN white_row = black_row 
      OR white_col = black_col 
      OR abs(white_row - black_row) = abs(white_col - black_col) 
    THEN 1
    
    -- Otherwise, they cannot attack
    ELSE 0
END;