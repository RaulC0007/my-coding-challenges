//
// This is only a SKELETON file for the 'Poker' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

const RANK_VALUES = {
  '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8,
  '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14
};

// Parsea una carta como "4S" -> { rank: 4, suit: 'S' }
function parseCard(cardStr) {
  const suit = cardStr.slice(-1);
  const rankStr = cardStr.slice(0, -1);
  return { rank: RANK_VALUES[rankStr], suit };
}

// Evalúa una mano y devuelve un vector de ranking comparable
// Formato: [categoría, tiebreaker1, tiebreaker2, ...]
// Categorías (mayor = mejor):
// 8: Straight Flush
// 7: Four of a Kind
// 6: Full House
// 5: Flush
// 4: Straight
// 3: Three of a Kind
// 2: Two Pair
// 1: One Pair
// 0: High Card
function evaluateHand(handStr) {
  const cards = handStr.split(' ').map(parseCard);
  
  // Contar frecuencias de cada rango
  const rankCounts = {};
  for (const card of cards) {
    rankCounts[card.rank] = (rankCounts[card.rank] || 0) + 1;
  }
  
  // Ordenar ranks únicos de mayor a menor
  const uniqueRanks = Object.keys(rankCounts).map(Number).sort((a, b) => b - a);
  
  // Agrupar ranks por frecuencia (para tiebreakers)
  // Primero los que aparecen más veces, luego por valor
  const groups = [];
  for (const [rank, count] of Object.entries(rankCounts)) {
    groups.push({ rank: Number(rank), count });
  }
  groups.sort((a, b) => {
    if (a.count !== b.count) return b.count - a.count;
    return b.rank - a.rank;
  });
  const tiebreakers = groups.map(g => g.rank);
  
  // Verificar Flush (todos del mismo palo)
  const isFlush = cards.every(c => c.suit === cards[0].suit);
  
  // Verificar Straight (consecutivos)
  const sortedRanks = cards.map(c => c.rank).sort((a, b) => a - b);
  let isStraight = false;
  let straightHigh = 0;
  
  // Caso normal: consecutivos
  if (sortedRanks.every((r, i) => i === 0 || r === sortedRanks[i - 1] + 1)) {
    isStraight = true;
    straightHigh = sortedRanks[4];
  }
  // Caso especial: A-2-3-4-5 (escalera baja, el As vale 1)
  else if (
    sortedRanks[0] === 2 && sortedRanks[1] === 3 && sortedRanks[2] === 4 &&
    sortedRanks[3] === 5 && sortedRanks[4] === 14
  ) {
    isStraight = true;
    straightHigh = 5; // El 5 es la carta más alta de esta escalera
  }
  
  // Determinar categoría y tiebreakers
  if (isStraight && isFlush) {
    return [8, straightHigh];
  }
  if (groups[0].count === 4) {
    return [7, ...tiebreakers];
  }
  if (groups[0].count === 3 && groups[1].count === 2) {
    return [6, ...tiebreakers];
  }
  if (isFlush) {
    return [5, ...uniqueRanks];
  }
  if (isStraight) {
    return [4, straightHigh];
  }
  if (groups[0].count === 3) {
    return [3, ...tiebreakers];
  }
  if (groups[0].count === 2 && groups[1].count === 2) {
    return [2, ...tiebreakers];
  }
  if (groups[0].count === 2) {
    return [1, ...tiebreakers];
  }
  // High Card
  return [0, ...uniqueRanks];
}

// Compara dos vectores de ranking lexicográficamente
function compareScores(a, b) {
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const va = a[i] || 0;
    const vb = b[i] || 0;
    if (va !== vb) return va - vb;
  }
  return 0;
}

export const bestHands = (hands) => {
  if (hands.length === 0) return [];
  
  // Evaluar todas las manos
  const evaluated = hands.map(h => ({ hand: h, score: evaluateHand(h) }));
  
  // Encontrar la mejor puntuación
  let best = evaluated[0];
  for (let i = 1; i < evaluated.length; i++) {
    if (compareScores(evaluated[i].score, best.score) > 0) {
      best = evaluated[i];
    }
  }
  
  // Devolver todas las manos que empaten con la mejor
  return evaluated
    .filter(e => compareScores(e.score, best.score) === 0)
    .map(e => e.hand);
};