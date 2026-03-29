/// <reference path="./global.d.ts" />
// @ts-check

/**
 * Creates a new score board with an initial entry.
 *
 * @returns {Record<string, number>} new score board
 */
export function createScoreBoard() {
  // Create an object with the initial entry as specified.
  const scoreBoard = {
    'The Best Ever': 1000000, // Player name as key, score as value
  };
  return scoreBoard;
}

/**
 * Adds a player to a score board.
 *
 * @param {Record<string, number>} scoreBoard The existing score board object.
 * @param {string} player The name of the player to add.
 * @param {number} score The score of the new player.
 * @returns {Record<string, number>} The updated score board.
 */
export function addPlayer(scoreBoard, player, score) {
  // Add a new key-value pair to the scoreBoard object.
  // If the player already exists, their score will be overwritten.
  scoreBoard[player] = score;
  return scoreBoard;
}

/**
 * Removes a player from a score board.
 *
 * @param {Record<string, number>} scoreBoard The existing score board object.
 * @param {string} player The name of the player to remove.
 * @returns {Record<string, number>} The updated score board.
 */
export function removePlayer(scoreBoard, player) {
  // Check if the player exists on the board before attempting to delete.
  // The 'delete' operator does nothing if the key doesn't exist,
  // so an 'if' check is technically optional for correctness,
  // but can sometimes be good for clarity or to avoid unnecessary operations.
  if (scoreBoard.hasOwnProperty(player)) { //
    delete scoreBoard[player]; //
  }
  return scoreBoard;
}

/**
 * Increases a player's score by the given amount.
 *
 * @param {Record<string, number>} scoreBoard The existing score board object.
 * @param {string} player The name of the player whose score should be increased.
 * @param {number} points The points to add to the score.
 * @returns {Record<string, number>} The updated score board.
 */
export function updateScore(scoreBoard, player, points) {
  // Access the player's current score and add the new points.
  // This assumes the player already exists on the board.
  // If the player might not exist, you'd add a check or initialize their score.
  scoreBoard[player] += points; //
  return scoreBoard;
}

/**
 * Applies 100 bonus points to all players on the board.
 *
 * @param {Record<string, number>} scoreBoard The existing score board object.
 * @returns {Record<string, number>} The updated score board.
 */
export function applyMondayBonus(scoreBoard) {
  // Iterate over all player names (keys) in the scoreBoard.
  for (const player in scoreBoard) { //
    // Ensure that the property belongs to the object itself and not its prototype chain.
    // This is good practice when using for...in.
    if (scoreBoard.hasOwnProperty(player)) { //
      scoreBoard[player] += 100; // Add 100 points to each player's score.
    }
  }
  return scoreBoard;
}