UPDATE "kindergarten-garden"
SET result = (
    WITH student_order AS (
        SELECT student, 
            (CASE student
                WHEN 'Alice'   THEN 0
                WHEN 'Bob'     THEN 1
                WHEN 'Charlie' THEN 2
                WHEN 'David'   THEN 3
                WHEN 'Eve'     THEN 4
                WHEN 'Fred'    THEN 5
                WHEN 'Ginny'   THEN 6
                WHEN 'Harriet' THEN 7
                WHEN 'Ileana'  THEN 8
                WHEN 'Joseph'  THEN 9
                WHEN 'Kincaid' THEN 10
                WHEN 'Larry'   THEN 11
            END) AS idx
    ),
    rows AS (
        SELECT
            substr(diagram, 1, instr(diagram, char(10)) - 1) AS row1,
            substr(diagram, instr(diagram, char(10)) + 1) AS row2
    ),
    letters AS (
        SELECT
            substr(row1, so.idx * 2 + 1, 1) AS l1,
            substr(row1, so.idx * 2 + 2, 1) AS l2,
            substr(row2, so.idx * 2 + 1, 1) AS l3,
            substr(row2, so.idx * 2 + 2, 1) AS l4
        FROM rows, student_order so
        WHERE so.student = "kindergarten-garden".student
    ),
    names AS (
        SELECT
            (CASE l1 WHEN 'G' THEN 'grass' WHEN 'C' THEN 'clover' WHEN 'R' THEN 'radishes' WHEN 'V' THEN 'violets' END) AS n1,
            (CASE l2 WHEN 'G' THEN 'grass' WHEN 'C' THEN 'clover' WHEN 'R' THEN 'radishes' WHEN 'V' THEN 'violets' END) AS n2,
            (CASE l3 WHEN 'G' THEN 'grass' WHEN 'C' THEN 'clover' WHEN 'R' THEN 'radishes' WHEN 'V' THEN 'violets' END) AS n3,
            (CASE l4 WHEN 'G' THEN 'grass' WHEN 'C' THEN 'clover' WHEN 'R' THEN 'radishes' WHEN 'V' THEN 'violets' END) AS n4
        FROM letters
    )
    SELECT n1 || ',' || n2 || ',' || n3 || ',' || n4
    FROM names
);