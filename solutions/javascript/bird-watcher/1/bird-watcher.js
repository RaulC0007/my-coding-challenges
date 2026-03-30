/**
 * Calculates the total number of birds counted.
 *
 * @param {number[]} birdsPerDay An array containing the bird count for each day.
 * @returns {number} The total number of birds counted.
 */
export function totalBirdCount(birdsPerDay) {
  let total = 0;
  for (let i = 0; i < birdsPerDay.length; i++) {
    total += birdsPerDay[i];
  }
  return total;
}

/**
 * Calculates the total number of birds counted in a specific week.
 *
 * @param {number[]} birdsPerDay An array containing the bird count for each day.
 * @param {number} week The week number (1-indexed).
 * @returns {number} The total number of birds counted in that week.
 */
export function birdsInWeek(birdsPerDay, week) {
  let weeklyTotal = 0;
  const startIndex = (week - 1) * 7;
  const endIndex = startIndex + 7;

  for (let i = startIndex; i < endIndex; i++) {
    if (i < birdsPerDay.length) { // Defensive check
      weeklyTotal += birdsPerDay[i];
    }
  }
  return weeklyTotal;
}

/**
 * Corrects a counting mistake by incrementing the bird count on every second day, starting from the first day.
 *
 * @param {number[]} birdsPerDay An array containing the bird count for each day.
 * @returns {number[]} The corrected array of bird counts.
 */
export function fixBirdCountLog(birdsPerDay) {
  for (let i = 0; i < birdsPerDay.length; i += 2) {
    birdsPerDay[i]++;
  }
  return birdsPerDay;
}
