/**
 * Creates a list of all wagon IDs as a single array.
 * This function uses a rest parameter to accept an arbitrary number of arguments.
 *
 * @param {...number} wagonIDs An arbitrary number of wagon IDs.
 * @returns {number[]} An array containing all given wagon IDs.
 */
export function getListOfWagons(...wagonIDs) {
  // The rest parameter 'wagonIDs' automatically collects all arguments into an array.
  return wagonIDs;
}

/**
 * Moves the first two wagon IDs to the end of the array.
 * This function uses array destructuring with a rest element and the spread operator.
 *
 * @param {number[]} eachWagonsID An array of wagon IDs.
 * @returns {number[]} A new array with the first two IDs repositioned at the end.
 */
export function fixListOfWagons(eachWagonsID) {
  // Destructure the first two elements and collect the rest of the array.
  const [firstWagon, secondWagon, ...restOfWagons] = eachWagonsID;

  // Use the spread operator to create a new array with the desired order.
  return [...restOfWagons, firstWagon, secondWagon];
}

/**
 * Adds missing wagon IDs into the main wagon ID array directly after the locomotive (ID 1).
 * This function uses array destructuring with a rest element and the spread operator.
 *
 * @param {number[]} eachWagonsID The main array of wagon IDs.
 * @param {number[]} missingWagons An array of missing wagon IDs to insert.
 * @returns {number[]} A new array with the missing wagons inserted.
 */
export function correctListOfWagons(eachWagonsID, missingWagons) {
  // Destructure the locomotive (assuming it's the first element as per examples)
  // and collect the rest of the existing wagons.
  const [locomotiveID, ...restOfExistingWagons] = eachWagonsID;

  // Use the spread operator to create a new array:
  // locomotive, then all missing wagons, then the rest of the original wagons.
  return [locomotiveID, ...missingWagons, ...restOfExistingWagons];
}

/**
 * Extends routing information by consolidating two objects.
 * This function uses the spread operator for objects.
 *
 * @param {object} route The object containing basic route information (e.g., from, to).
 * @param {object} moreRouteInformation An object with additional routing details.
 * @returns {object} A consolidated object with all routing information.
 */
export function extendRouteInformation(route, moreRouteInformation) {
  // Use the spread operator to merge the properties of both objects into a new one.
  // If there are duplicate keys, properties from 'moreRouteInformation' will overwrite
  // those from 'route'.
  return { ...route, ...moreRouteInformation };
}

/**
 * Separates the arrival time from the routing information object.
 * This function uses object destructuring with a rest property.
 *
 * @param {object} routeInformation The object containing full routing information.
 * @param {string} routeInformation.timeOfArrival The arrival time property.
 * @returns {(string | object)[]} An array where the first element is the arrival time
 * and the second element is an object with the remaining routing information.
 */
export function separateTimeOfArrival(routeInformation) {
  // Destructure 'timeOfArrival' and use the rest property '...' to collect all other
  // properties into a new object called 'restOfRouteInfo'.
  const { timeOfArrival, ...restOfRouteInfo } = routeInformation;

  // Return the extracted time and the new object in an array.
  return [timeOfArrival, restOfRouteInfo];
}