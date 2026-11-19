UPDATE "twelve-days"
SET result = (
  SELECT group_concat(line, char(10))
  FROM (
    SELECT 
      d.n, 
      printf('On the %s day of Christmas my true love gave to me: %s', d.day_name, d.gift) AS line
    FROM (
      SELECT 1 AS n, 'first' AS day_name, 'a Partridge in a Pear Tree.' AS gift
      UNION ALL SELECT 2, 'second', 'two Turtle Doves, and a Partridge in a Pear Tree.'
      UNION ALL SELECT 3, 'third', 'three French Hens, two Turtle Doves, and a Partridge in a Pear Tree.'
      UNION ALL SELECT 4, 'fourth', 'four Calling Birds, three French Hens, two Turtle Doves, and a Partridge in a Pear Tree.'
      UNION ALL SELECT 5, 'fifth', 'five Gold Rings, four Calling Birds, three French Hens, two Turtle Doves, and a Partridge in a Pear Tree.'
      UNION ALL SELECT 6, 'sixth', 'six Geese-a-Laying, five Gold Rings, four Calling Birds, three French Hens, two Turtle Doves, and a Partridge in a Pear Tree.'
      UNION ALL SELECT 7, 'seventh', 'seven Swans-a-Swimming, six Geese-a-Laying, five Gold Rings, four Calling Birds, three French Hens, two Turtle Doves, and a Partridge in a Pear Tree.'
      UNION ALL SELECT 8, 'eighth', 'eight Maids-a-Milking, seven Swans-a-Swimming, six Geese-a-Laying, five Gold Rings, four Calling Birds, three French Hens, two Turtle Doves, and a Partridge in a Pear Tree.'
      UNION ALL SELECT 9, 'ninth', 'nine Ladies Dancing, eight Maids-a-Milking, seven Swans-a-Swimming, six Geese-a-Laying, five Gold Rings, four Calling Birds, three French Hens, two Turtle Doves, and a Partridge in a Pear Tree.'
      UNION ALL SELECT 10, 'tenth', 'ten Lords-a-Leaping, nine Ladies Dancing, eight Maids-a-Milking, seven Swans-a-Swimming, six Geese-a-Laying, five Gold Rings, four Calling Birds, three French Hens, two Turtle Doves, and a Partridge in a Pear Tree.'
      UNION ALL SELECT 11, 'eleventh', 'eleven Pipers Piping, ten Lords-a-Leaping, nine Ladies Dancing, eight Maids-a-Milking, seven Swans-a-Swimming, six Geese-a-Laying, five Gold Rings, four Calling Birds, three French Hens, two Turtle Doves, and a Partridge in a Pear Tree.'
      UNION ALL SELECT 12, 'twelfth', 'twelve Drummers Drumming, eleven Pipers Piping, ten Lords-a-Leaping, nine Ladies Dancing, eight Maids-a-Milking, seven Swans-a-Swimming, six Geese-a-Laying, five Gold Rings, four Calling Birds, three French Hens, two Turtle Doves, and a Partridge in a Pear Tree.'
    ) AS d
    WHERE d.n BETWEEN "twelve-days".start_verse AND "twelve-days".end_verse
    ORDER BY d.n ASC
  )
);