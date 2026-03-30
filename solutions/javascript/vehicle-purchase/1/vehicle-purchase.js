/**
 * Determines whether or not you need a drivers license to operate a certain kind of vehicle.
 *
 * @param {string} kind The kind of vehicle.
 * @returns {boolean} True if a license is needed, false otherwise.
 */
export function needsLicense(kind) {
  return kind === 'car' || kind === 'truck';
}

/**
 * Helps you choose between two potential vehicles by returning the one that comes first in dictionary order.
 *
 * @param {string} option1 The first vehicle option.
 * @param {string} option2 The second vehicle option.
 * @returns {string} A string indicating the better choice.
 */
export function chooseVehicle(option1, option2) {
  if (option1 < option2) {
    return `${option1} is clearly the better choice.`;
  } else {
    return `${option2} is clearly the better choice.`;
  }
}

/**
 * Calculates an estimation for the price of a used vehicle based on its original price and age.
 *
 * @param {number} originalPrice The original price of the vehicle.
 * @param {number} age The age of the vehicle in years.
 * @returns {number} The estimated resell price.
 */
export function calculateResellPrice(originalPrice, age) {
  let resellPrice;

  if (age < 3) {
    resellPrice = originalPrice * 0.80;
  } else if (age > 10) {
    resellPrice = originalPrice * 0.50;
  } else {
    resellPrice = originalPrice * 0.70;
  }

  return resellPrice;
}