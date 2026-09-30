UPDATE house
SET result = (
    SELECT group_concat(verse_text, char(10))
    FROM (
        SELECT 1 AS n, 'This is the house that Jack built.' AS verse_text
        UNION ALL
        SELECT 2, 'This is the malt' || ' ' ||
                  'that lay in the house that Jack built.'
        UNION ALL
        SELECT 3, 'This is the rat' || ' ' ||
                  'that ate the malt' || ' ' ||
                  'that lay in the house that Jack built.'
        UNION ALL
        SELECT 4, 'This is the cat' || ' ' ||
                  'that killed the rat' || ' ' ||
                  'that ate the malt' || ' ' ||
                  'that lay in the house that Jack built.'
        UNION ALL
        SELECT 5, 'This is the dog' || ' ' ||
                  'that worried the cat' || ' ' ||
                  'that killed the rat' || ' ' ||
                  'that ate the malt' || ' ' ||
                  'that lay in the house that Jack built.'
        UNION ALL
        SELECT 6, 'This is the cow with the crumpled horn' || ' ' ||
                  'that tossed the dog' || ' ' ||
                  'that worried the cat' || ' ' ||
                  'that killed the rat' || ' ' ||
                  'that ate the malt' || ' ' ||
                  'that lay in the house that Jack built.'
        UNION ALL
        SELECT 7, 'This is the maiden all forlorn' || ' ' ||
                  'that milked the cow with the crumpled horn' || ' ' ||
                  'that tossed the dog' || ' ' ||
                  'that worried the cat' || ' ' ||
                  'that killed the rat' || ' ' ||
                  'that ate the malt' || ' ' ||
                  'that lay in the house that Jack built.'
        UNION ALL
        SELECT 8, 'This is the man all tattered and torn' || ' ' ||
                  'that kissed the maiden all forlorn' || ' ' ||
                  'that milked the cow with the crumpled horn' || ' ' ||
                  'that tossed the dog' || ' ' ||
                  'that worried the cat' || ' ' ||
                  'that killed the rat' || ' ' ||
                  'that ate the malt' || ' ' ||
                  'that lay in the house that Jack built.'
        UNION ALL
        SELECT 9, 'This is the priest all shaven and shorn' || ' ' ||
                  'that married the man all tattered and torn' || ' ' ||
                  'that kissed the maiden all forlorn' || ' ' ||
                  'that milked the cow with the crumpled horn' || ' ' ||
                  'that tossed the dog' || ' ' ||
                  'that worried the cat' || ' ' ||
                  'that killed the rat' || ' ' ||
                  'that ate the malt' || ' ' ||
                  'that lay in the house that Jack built.'
        UNION ALL
        SELECT 10, 'This is the rooster that crowed in the morn' || ' ' ||
                   'that woke the priest all shaven and shorn' || ' ' ||
                   'that married the man all tattered and torn' || ' ' ||
                   'that kissed the maiden all forlorn' || ' ' ||
                   'that milked the cow with the crumpled horn' || ' ' ||
                   'that tossed the dog' || ' ' ||
                   'that worried the cat' || ' ' ||
                   'that killed the rat' || ' ' ||
                   'that ate the malt' || ' ' ||
                   'that lay in the house that Jack built.'
        UNION ALL
        SELECT 11, 'This is the farmer sowing his corn' || ' ' ||
                   'that kept the rooster that crowed in the morn' || ' ' ||
                   'that woke the priest all shaven and shorn' || ' ' ||
                   'that married the man all tattered and torn' || ' ' ||
                   'that kissed the maiden all forlorn' || ' ' ||
                   'that milked the cow with the crumpled horn' || ' ' ||
                   'that tossed the dog' || ' ' ||
                   'that worried the cat' || ' ' ||
                   'that killed the rat' || ' ' ||
                   'that ate the malt' || ' ' ||
                   'that lay in the house that Jack built.'
        UNION ALL
        SELECT 12, 'This is the horse and the hound and the horn' || ' ' ||
                   'that belonged to the farmer sowing his corn' || ' ' ||
                   'that kept the rooster that crowed in the morn' || ' ' ||
                   'that woke the priest all shaven and shorn' || ' ' ||
                   'that married the man all tattered and torn' || ' ' ||
                   'that kissed the maiden all forlorn' || ' ' ||
                   'that milked the cow with the crumpled horn' || ' ' ||
                   'that tossed the dog' || ' ' ||
                   'that worried the cat' || ' ' ||
                   'that killed the rat' || ' ' ||
                   'that ate the malt' || ' ' ||
                   'that lay in the house that Jack built.'
    )
    WHERE n BETWEEN house.start_verse AND house.end_verse
    ORDER BY n
);