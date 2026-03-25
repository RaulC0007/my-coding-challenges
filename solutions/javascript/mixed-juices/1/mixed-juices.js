/**
 * Determines how long it takes to mix a juice.
 *
 * @param {string} juice The name of the juice to mix.
 * @returns {number} The time in minutes it takes to mix the juice.
 */
export function timeToMixJuice(juice) {
  switch (juice) {
    case 'Pure Strawberry Joy':
      return 0.5;
    case 'Energizer':
    case 'Green Garden': // Both 'Energizer' and 'Green Garden' take 1.5 minutes
      return 1.5;
    case 'Tropical Island':
      return 3;
    case 'All or Nothing':
      return 5;
    default: // For all other drinks
      return 2.5;
  }
}

/**
 * Calculates the number of limes Li Mei needs to cut to get the desired number of wedges.
 *
 * @param {number} wedgesNeeded The total number of wedges required.
 * @param {string[]} limes An array representing the supply of whole limes ('small', 'medium', 'large').
 * @returns {number} The number of limes cut.
 */
export function limesToCut(wedgesNeeded, limes) {
  let limesCut = 0;
  let totalWedgesCut = 0;
  let limeIndex = 0; // Use an index to iterate through the `limes` array

  // Continue looping as long as we still need more wedges
  // AND there are still limes available in the array
  while (totalWedgesCut < wedgesNeeded && limeIndex < limes.length) {
    const currentLimeSize = limes[limeIndex];
    limesCut++; // Increment the count of limes actually cut

    // Add wedges based on the size of the current lime
    switch (currentLimeSize) {
      case 'small':
        totalWedgesCut += 6;
        break;
      case 'medium':
        totalWedgesCut += 8;
        break;
      case 'large':
        totalWedgesCut += 10;
        break;
      // No default needed, as per problem description assuming valid lime types
    }
    limeIndex++; // Move to the next lime in the supply
  }

  return limesCut;
}

/**
 * Determines which orders Li Mei cannot finish before the end of her shift.
 * Orders are processed sequentially.
 *
 * @param {number} timeLeft The number of minutes left in Li Mei's shift.
 * @param {string[]} orders An array of juice orders that are pending.
 * @returns {string[]} An array of orders that remain for Dmitry.
 */
export function remainingOrders(timeLeft, orders) {
  let i = 0; // This index will track how many orders Li Mei *has completed*

  // Loop through each order. 'i' will be the index of the current order Li Mei is considering.
  // The loop continues as long as there are orders to consider.
  // The decision to stop is made *inside* the loop based on remaining time.
  for (i = 0; i < orders.length; i++) {
    const currentJuice = orders[i];
    const timeToMakeCurrentJuice = timeToMixJuice(currentJuice); // Get the time for the current juice

    // **CRITICAL LOGIC for remainingOrders:**
    // If her remaining time (`timeLeft`) is already zero or negative *before* she
    // even *considers* starting the *current* juice (`orders[i]`),
    // then she cannot start this juice or any subsequent ones.
    // This is the point where Dmitry takes over.
    if (timeLeft <= 0) {
      break; // Exit the loop. 'i' now points to the first unstarted order.
    }

    // If she has time (timeLeft > 0), she starts and finishes this juice.
    // Her time will be reduced, potentially going negative, because she "will always finish it".
    timeLeft -= timeToMakeCurrentJuice;
  }

  // After the loop, 'i' will be the index of the first order that Li Mei did NOT complete
  // (because she couldn't start it), or it will be `orders.length` if she completed all orders.
  // We return a slice of the original orders array starting from that index.
  return orders.slice(i);
}
