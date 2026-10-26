UPDATE "armstrong-numbers"
SET result = (
  WITH RECURSIVE
    -- 1. Convertir el número a texto para extraer longitud y dígitos
    num_str(s) AS (
      SELECT CAST("armstrong-numbers".number AS TEXT)
    ),
    len(n) AS (
      SELECT LENGTH(s) FROM num_str
    ),
    -- 2. Descomponer el número dígito por dígito de forma recursiva
    digits(pos, digit, remaining) AS (
      SELECT 
        1, 
        CAST(SUBSTR(s, 1, 1) AS INTEGER), 
        SUBSTR(s, 2) 
      FROM num_str
      WHERE LENGTH(s) > 0
      UNION ALL
      SELECT 
        pos + 1, 
        CAST(SUBSTR(remaining, 1, 1) AS INTEGER), 
        SUBSTR(remaining, 2) 
      FROM digits
      WHERE LENGTH(remaining) > 0
    ),
    -- 3. Elevar cada dígito a la potencia de la longitud total y sumar
    computed(sum_val) AS (
      SELECT COALESCE(SUM(CAST(ROUND(POWER(digit, (SELECT n FROM len))) AS INTEGER)), 0)
      FROM digits
    )
  -- 4. Retornar verdadero (1) si la suma es igual al número original, de lo contrario falso (0)
  SELECT CASE 
    WHEN "armstrong-numbers".number = 0 THEN 1 -- Caso especial para el 0
    ELSE (SELECT CASE WHEN sum_val = "armstrong-numbers".number THEN 1 ELSE 0 END FROM computed)
  END
);