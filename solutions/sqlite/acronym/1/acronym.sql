UPDATE acronym
SET result = (
  SELECT group_concat(substr(word, 1, 1), '')
  FROM (
    -- Esta subconsulta desglosa la frase en palabras limpias de puntuación y guiones
    -- (Reemplazando guiones y guiones bajos por espacios, y filtrando tokens vacíos)
    WITH RECURSIVE
      clean_phrase(str) AS (
        SELECT upper(replace(replace(phrase, '-', ' '), '_', ' ')) FROM acronym t2 WHERE t2.phrase = acronym.phrase
      ),
      tokens(word, rest) AS (
        SELECT 
          CASE WHEN instr(str, ' ') > 0 THEN substr(str, 1, instr(str, ' ') - 1) ELSE str END,
          CASE WHEN instr(str, ' ') > 0 THEN substr(str, instr(str, ' ') + 1) ELSE '' END
        FROM clean_phrase
        UNION ALL
        SELECT 
          CASE WHEN instr(rest, ' ') > 0 THEN substr(rest, 1, instr(rest, ' ') - 1) ELSE rest END,
          CASE WHEN instr(rest, ' ') > 0 THEN substr(rest, instr(rest, ' ') + 1) ELSE '' END
        FROM tokens
        WHERE rest <> ''
      )
    SELECT word 
    FROM tokens 
    WHERE word <> '' 
      AND word GLOB '[A-Z]*' -- Asegurar que solo consideramos palabras que empiezan con letras
  )
);
