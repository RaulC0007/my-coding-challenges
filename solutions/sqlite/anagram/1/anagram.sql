UPDATE anagram
SET result = (
  WITH RECURSIVE
    -- 1. Desglosar las letras del sujeto (subject) en minúsculas
    subject_letters(pos, letter) AS (
      SELECT 1, lower(substr(subject, 1, 1)) FROM anagram a WHERE a.rowid = anagram.rowid
      UNION ALL
      SELECT pos + 1, lower(substr(subject, pos + 1, 1))
      FROM subject_letters
      WHERE pos < length((SELECT subject FROM anagram a WHERE a.rowid = anagram.rowid))
    ),
    -- Ordenar las letras del sujeto alfabéticamente
    target_sorted AS (
      SELECT group_concat(letter, '') AS sorted_target
      FROM (
        SELECT letter FROM subject_letters ORDER BY letter ASC
      )
    ),
    -- 2. Expandir el arreglo JSON de candidatos
    cand_list AS (
      SELECT value AS cand_word, id AS cand_id
      FROM json_each(anagram.candidates)
    ),
    -- 3. Filtrar por longitud y descartar idénticos, luego desglosar sus letras
    cand_letters(cand_id, pos, letter) AS (
      SELECT cand_id, 1, lower(substr(cand_word, 1, 1))
      FROM cand_list
      WHERE length(cand_word) = length(anagram.subject) 
        AND lower(cand_word) <> lower(anagram.subject)
      UNION ALL
      SELECT cl.cand_id, cl.pos + 1, lower(substr(c.cand_word, cl.pos + 1, 1))
      FROM cand_letters cl
      JOIN cand_list c ON c.cand_id = cl.cand_id
      WHERE cl.pos < length(c.cand_word)
    ),
    -- Ordenar las letras de cada candidato alfabéticamente
    cand_sorted AS (
      SELECT cand_id, group_concat(letter, '') AS sorted_cand
      FROM (
        SELECT cand_id, letter
        FROM cand_letters
        ORDER BY cand_id, letter ASC
      )
      GROUP BY cand_id
    )
  -- 4. Construir el arreglo JSON con las palabras que coincidan
  SELECT COALESCE(
    (
      SELECT json_group_array(c.cand_word)
      FROM cand_list c
      JOIN cand_sorted cs ON cs.cand_id = c.cand_id
      CROSS JOIN target_sorted ts
      WHERE cs.sorted_cand = ts.sorted_target
      ORDER BY c.cand_id
    ),
    json_array()
  )
);