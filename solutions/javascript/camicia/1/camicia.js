export const simulateGame = (playerA, playerB) => {
  let currentA = Array.isArray(playerA) ? [...playerA] : playerA.split('');
  let currentB = Array.isArray(playerB) ? [...playerB] : playerB.split('');

  const PAYMENT_CARDS = { 'J': 1, 'Q': 2, 'K': 3, 'A': 4 };

  let pile = [];
  let cardsPlayed = 0;
  let tricks = 0;
  let currentPlayer = 'A';  

  const seenStates = new Set();

  // El juego sigue vivo si ambos tienen cartas, O si queda un botín en el centro por reclamar
  while ((currentA.length > 0 && currentB.length > 0) || pile.length > 0) {
    
    // 1. Registro y detección de bucles (Solo con la pila vacía al iniciar un ciclo de bazas)
    if (pile.length === 0) {
      const getStateKey = (deck) => deck.map(c => PAYMENT_CARDS[c] ? c : 'N').join('');
      const stateKey = `${getStateKey(currentA)}|${getStateKey(currentB)}|${currentPlayer}`;

      if (seenStates.has(stateKey)) {
        return { status: "loop", cards: cardsPlayed, tricks: tricks };
      }
      seenStates.add(stateKey);
    }

    let activeDeck = currentPlayer === 'A' ? currentA : currentB;

    // Si al jugador actual le toca tirar una carta ordinaria pero ya no tiene, el rival gana la pila
    if (activeDeck.length === 0) {
      let winner = currentPlayer === 'A' ? 'B' : 'A';
      let winnerDeck = winner === 'A' ? currentA : currentB;
      winnerDeck.push(...pile);
      pile = [];
      tricks++;
      currentPlayer = winner;
      
      // Si tras llevarse el truco el oponente tiene todas las cartas, el juego acaba de inmediato
      if (currentA.length === 0 || currentB.length === 0) break;
      continue;
    }

    // El jugador tira su carta normal
    const card = activeDeck.shift();
    pile.push(card);
    cardsPlayed++;

    // 2. Si la carta es de pago, gestionamos la sub-ronda de penalizaciones consecutivas
    if (PAYMENT_CARDS[card]) {
      let penaltyAmount = PAYMENT_CARDS[card];
      let penaltyPayer = currentPlayer === 'A' ? 'B' : 'A';
      let penaltyFinished = false;

      while (!penaltyFinished) {
        let payerDeck = penaltyPayer === 'A' ? currentA : currentB;

        // Si el pagador se queda seco a mitad del pago, el creador del castigo se lleva todo
        if (payerDeck.length === 0) {
          let winner = penaltyPayer === 'A' ? 'B' : 'A';
          let winnerDeck = winner === 'A' ? currentA : currentB;
          winnerDeck.push(...pile);
          pile = [];
          tricks++;
          currentPlayer = winner;
          penaltyFinished = true;
          break;
        }

        const penaltyCard = payerDeck.shift();
        pile.push(penaltyCard);
        cardsPlayed++;

        if (PAYMENT_CARDS[penaltyCard]) {
          // Contra-ataque: Se interrumpe la penalización y cambia el rol del pagador
          penaltyAmount = PAYMENT_CARDS[penaltyCard];
          penaltyPayer = penaltyPayer === 'A' ? 'B' : 'A';
        } else {
          penaltyAmount--;
          if (penaltyAmount === 0) {
            // Castigo completado con éxito sin interrupción. El dueño de la carta de pago gana la baza.
            let winner = penaltyPayer === 'A' ? 'B' : 'A';
            let winnerDeck = winner === 'A' ? currentA : currentB;
            winnerDeck.push(...pile);
            pile = [];
            tricks++;
            currentPlayer = winner;
            penaltyFinished = true;
          }
        }
      }
      
      // Validar si la resolución de la penalización dejó a alguien con el mazo completo
      if (currentA.length === 0 || currentB.length === 0) break;

    } else {
      // 3. Si fue una carta numérica común, el turno pasa al oponente de manera fluida
      currentPlayer = currentPlayer === 'A' ? 'B' : 'A';
      
      // Si ambos se quedaron sin cartas en la mano tras tirar números, el último jugador recoge la pila
      if (currentA.length === 0 && currentB.length === 0) {
        let winner = currentPlayer === 'A' ? 'B' : 'A'; // El que acaba de tirar
        let winnerDeck = winner === 'A' ? currentA : currentB;
        winnerDeck.push(...pile);
        pile = [];
        tricks++;
        currentPlayer = winner;
        break;
      }
    }
  }

  return {
    status: "finished",
    cards: cardsPlayed,
    tricks: tricks
  };
};