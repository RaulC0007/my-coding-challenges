/// <reference path="./global.d.ts" />
// @ts-check

/**
 * Implement the functions needed to solve the exercise here.
 * Do not forget to export them so they are available for the
 * tests. Here an example of the syntax as reminder:
 *
 * export function yourFunction(...) {
 *   ...
 * }
 */
// @ts-check

/**
 * Determines whether the lasagna is done based on the remaining time.
 *
 * @param {number | undefined} remainingTimeInMinutes The time remaining on the timer in minutes.
 * @returns {string} The cooking status message.
 */
export function cookingStatus(remainingTimeInMinutes) {
  if (remainingTimeInMinutes === 0) {
    return 'Lasagna is done.';
  } else if (remainingTimeInMinutes > 0) {
    return 'Not done, please wait.';
  } else { // remainingTimeInMinutes is undefined or null
    return 'You forgot to set the timer.';
  }
}

/**
 * Estimates the total preparation time based on the number of layers.
 *
 * @param {string[]} layers An array of lasagna layers.
 * @param {number} [averagePrepTimePerLayer=2] The average preparation time per layer in minutes. Defaults to 2.
 * @returns {number} The total estimated preparation time.
 */
export function preparationTime(layers, averagePrepTimePerLayer = 2) {
  // The number of layers multiplied by the average preparation time per layer.
  return layers.length * averagePrepTimePerLayer;
}

/**
 * Computes the amounts of noodles and sauce needed for the lasagna.
 *
 * @param {string[]} layers An array of lasagna layers.
 * @returns {{noodles: number, sauce: number}} An object containing the quantities of noodles and sauce.
 */
export function quantities(layers) {
  let noodlesNeeded = 0;
  let sauceNeeded = 0;

  for (const layer of layers) {
    if (layer === 'noodles') {
      noodlesNeeded += 50; // 50 grams for each noodle layer
    } else if (layer === 'sauce') {
      sauceNeeded += 0.2; // 0.2 liters for each sauce layer
    }
  }

  return { noodles: noodlesNeeded, sauce: sauceNeeded };
}

/**
 * Adds a secret ingredient to your recipe list.
 * The friend's list should not be modified, but your list should be.
 *
 * @param {string[]} friendsList The friend's list of ingredients.
 * @param {string[]} myList Your list of ingredients.
 * @returns {void} This function modifies myList directly and does not return anything.
 */
export function addSecretIngredient(friendsList, myList) {
  // Get the last item from the friend's list.
  // Using slice(-1)[0] ensures we don't modify friendsList if it's mutable
  // and gives us the element directly.
  const secretIngredient = friendsList[friendsList.length - 1];

  // Add the secret ingredient to the end of your list.
  myList.push(secretIngredient);
}

/**
 * Scales a recipe to a desired number of portions.
 * The original recipe object should not be modified.
 *
 * @param {object} recipe The original recipe object for 2 portions.
 * @param {number} numberOfPortions The desired number of portions.
 * @returns {object} A new recipe object with scaled amounts.
 */
export function scaleRecipe(recipe, numberOfPortions) {
  // Calculate the scaling factor relative to the base (2 portions).
  const scalingFactor = numberOfPortions / 2;

  // Create a new object to store the scaled recipe to avoid modifying the original.
  const scaledRecipe = {};

  // Iterate over the keys (ingredients) in the original recipe.
  for (const ingredient in recipe) {
    // Check if the property belongs directly to the object (good practice with for...in).
    if (Object.prototype.hasOwnProperty.call(recipe, ingredient)) {
      // Multiply each ingredient's amount by the scaling factor.
      scaledRecipe[ingredient] = recipe[ingredient] * scalingFactor;
    }
  }

  return scaledRecipe;
}