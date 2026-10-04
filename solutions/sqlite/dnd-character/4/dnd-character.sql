-- 1. Generate random ability scores (3 to 18) for all 'random' input rows
UPDATE "dnd-character" 
SET 
  strength     = abs(random() % 16) + 3,
  dexterity    = abs(random() % 16) + 3,
  constitution = abs(random() % 16) + 3,
  intelligence = abs(random() % 16) + 3,
  wisdom       = abs(random() % 16) + 3,
  charisma     = abs(random() % 16) + 3
WHERE input = 'random';

-- 2. Copy the generated stats to the 'empty input' row (input = '')
UPDATE "dnd-character"
SET 
  strength     = subq.strength,
  dexterity    = subq.dexterity,
  constitution = subq.constitution,
  intelligence = subq.intelligence,
  wisdom       = subq.wisdom,
  charisma     = subq.charisma
FROM (
  SELECT strength, dexterity, constitution, intelligence, wisdom, charisma
  FROM "dnd-character"
  WHERE property = 'character' AND input = 'random'
) AS subq
WHERE property = 'character' AND input = '';

-- 3. Calculate the modifier for ALL rows based on constitution
-- Using 10.0 and 2.0 forces float division, and FLOOR() handles negative rounding correctly
UPDATE "dnd-character" 
SET modifier = CAST(FLOOR((constitution - 10.0) / 2.0) AS INTEGER);

-- 4. Calculate hitpoints for ALL rows
UPDATE "dnd-character" 
SET hitpoints = 10 + modifier;