export const simulateGame = (
  playerA: string[],
  playerB: string[]
): { status: 'finished' | 'loop'; cards: number; tricks: number } => {
  const PAYMENT_CARDS: Record<string, number> = {
    'J': 1,
    'Q': 2,
    'K': 3,
    'A': 4,
  };

  let deckA = [...playerA];
  let deckB = [...playerB];
  let pile: string[] = [];
  let cardsPlayed = 0;
  let tricks = 0;
  let currentPlayer: 'A' | 'B' = 'A';

  const seenStates = new Set<string>();

  const getStateKey = (): string => {
    const normalize = (deck: string[]): string => {
      return deck.map(card => PAYMENT_CARDS[card] ? card : 'N').join(',');
    };
    // Incluimos al jugador actual en el estado para una detección de bucles precisa
    return `${normalize(deckA)}|${normalize(deckB)}|${currentPlayer}`;
  };

  while (deckA.length > 0 && deckB.length > 0) {
    const stateKey = getStateKey();
    if (seenStates.has(stateKey)) {
      return { status: 'loop', cards: cardsPlayed, tricks };
    }
    seenStates.add(stateKey);

    let penaltyOwed = 0;
    let lastPaymentPlayer: 'A' | 'B' | null = null;

    while (true) {
      // CORRECCIÓN: Acceso directo al mazo basado en el string literal
      const currentDeck = currentPlayer === 'A' ? deckA : deckB;

      if (currentDeck.length === 0) {
        const winner: 'A' | 'B' = currentPlayer === 'A' ? 'B' : 'A';
        if (winner === 'A') deckA.push(...pile);
        else deckB.push(...pile);
        
        pile = [];
        tricks++;
        currentPlayer = winner;
        break;
      }

      const card = currentDeck.shift()!;
      pile.push(card);
      cardsPlayed++;

      const paymentValue = PAYMENT_CARDS[card] || 0;

      if (penaltyOwed > 0) {
        if (paymentValue > 0) {
          penaltyOwed = paymentValue;
          lastPaymentPlayer = currentPlayer;
          currentPlayer = currentPlayer === 'A' ? 'B' : 'A';
        } else {
          penaltyOwed--;
          if (penaltyOwed === 0) {
            const winner: 'A' | 'B' = lastPaymentPlayer!;
            if (winner === 'A') deckA.push(...pile);
            else deckB.push(...pile);
            
            pile = [];
            tricks++;
            currentPlayer = winner;
            break;
          }
        }
      } else {
        if (paymentValue > 0) {
          penaltyOwed = paymentValue;
          lastPaymentPlayer = currentPlayer;
          currentPlayer = currentPlayer === 'A' ? 'B' : 'A';
        } else {
          currentPlayer = currentPlayer === 'A' ? 'B' : 'A';
          // Si el siguiente jugador no tiene cartas, termina el truco
          const nextDeck = currentPlayer === 'A' ? deckA : deckB;
          if (nextDeck.length === 0) {
            const winner: 'A' | 'B' = currentPlayer === 'A' ? 'B' : 'A';
            if (winner === 'A') deckA.push(...pile);
            else deckB.push(...pile);
            
            pile = [];
            tricks++;
            currentPlayer = winner;
            break;
          }
        }
      }
    }
  }

  return { status: 'finished', cards: cardsPlayed, tricks };
};