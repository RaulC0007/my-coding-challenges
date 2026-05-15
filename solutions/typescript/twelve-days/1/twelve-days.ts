const DAYS = [
  'first', 'second', 'third', 'fourth', 'fifth', 'sixth',
  'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth'
];

const GIFTS = [
  'a Partridge in a Pear Tree',
  'two Turtle Doves',
  'three French Hens',
  'four Calling Birds',
  'five Gold Rings',
  'six Geese-a-Laying',
  'seven Swans-a-Swimming',
  'eight Maids-a-Milking',
  'nine Ladies Dancing',
  'ten Lords-a-Leaping',
  'eleven Pipers Piping',
  'twelve Drummers Drumming'
];

/**
 * Recita los versos de "The Twelve Days of Christmas" para un rango específico.
 * * @param start - El día inicial (1-12)
 * @param end - El día final (1-12)
 * @returns Un único string con los versos solicitados perfectamente formateados.
 */
export function recite(start: number, end: number): string {
  const verses: string[] = [];
  
  // Iteramos en el rango solicitado por los argumentos (convertido a índices 0-11)
  for (let i = start - 1; i < end; i++) {
    const day = DAYS[i];
    const giftList: string[] = [];
    
    // Construimos la lista de regalos en orden inverso
    for (let j = i; j >= 0; j--) {
      giftList.push(GIFTS[j]);
    }
    
    let verse: string;
    if (giftList.length === 1) {
      verse = `On the ${day} day of Christmas my true love gave to me: ${giftList[0]}.`;
    } else {
      const lastGift = giftList.pop();
      const firstPart = giftList.join(', ');
      verse = `On the ${day} day of Christmas my true love gave to me: ${firstPart}, and ${lastGift}.`;
    }
    
    // Añadimos el verso con su respectivo salto de línea al final
    verses.push(verse + '\n');
  }
  
  // Unimos todas las cadenas sin añadir caracteres adicionales intermedios
  return verses.join('');
}