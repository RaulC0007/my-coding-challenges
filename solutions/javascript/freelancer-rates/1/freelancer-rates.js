// No import statements needed at the top if all functions are in this file.

/**
 * Calculates the daily rate from an hourly rate.
 *
 * @param {number} ratePerHour The hourly rate.
 * @returns {number} The daily rate.
 */
export function dayRate(ratePerHour) {
  // A day has 8 working hours.
  return ratePerHour * 8;
}

/**
 * Calculates the number of workdays a freelancer can work with a given budget.
 *
 * @param {number} budget The total budget.
 * @param {number} ratePerHour The hourly rate.
 * @returns {number} The number of workdays, rounded down.
 */
export function daysInBudget(budget, ratePerHour) {
  // You can call dayRate directly because it's defined in the same file.
  const dailyRate = dayRate(ratePerHour);
  return Math.floor(budget / dailyRate);
}

const BILLABLE_DAYS_PER_MONTH = 22; // This can stay here, it's a constant.

/**
 * Calculates the project cost with a monthly discount.
 *
 * @param {number} ratePerHour The hourly rate.
 * @param {number} numBillableDays The total number of billable days for the project.
 * @param {number} discount The monthly discount as a decimal (e.g., 0.42 for 42%).
 * @returns {number} The total cost, rounded up.
 */
export function priceWithMonthlyDiscount(ratePerHour, numBillableDays, discount) {
  // You can call dayRate directly because it's defined in the same file.
  const dailyRate = dayRate(ratePerHour);

  const fullMonths = Math.floor(numBillableDays / BILLABLE_DAYS_PER_MONTH);
  const remainingDays = numBillableDays % BILLABLE_DAYS_PER_MONTH;

  const costFullMonths = fullMonths * BILLABLE_DAYS_PER_MONTH * dailyRate * (1 - discount);
  const costRemainingDays = remainingDays * dailyRate;

  return Math.ceil(costFullMonths + costRemainingDays);
}