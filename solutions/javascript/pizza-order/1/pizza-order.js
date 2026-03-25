// This class would typically be defined in a separate file or provided by the test setup.
// Including it here for completeness, though it might not need to be exported
// depending on how Exercism structures the solution.
export class PizzaOrder {
  constructor(pizza, ...extras) {
    this.pizza = pizza;
    this.extras = extras;
  }
}

/**
 * Calculates the price of a single pizza, including base price and extras.
 *
 * @param {string} pizzaName The name of the base pizza ('Margherita', 'Caprese', 'Formaggio').
 * @param {...string} options Any additional options ('ExtraSauce', 'ExtraToppings').
 * @returns {number} The total cost of the pizza.
 */
export function pizzaPrice(pizzaName, ...options) {
  let price = 0;

  switch (pizzaName) {
    case 'Margherita':
      price = 7;
      break;
    case 'Caprese':
      price = 9;
      break;
    case 'Formaggio':
      price = 10;
      break;
    default:
      price = 0; // Default for unknown pizza names, or throw an error.
  }

  for (const option of options) {
    switch (option) {
      case 'ExtraSauce':
        price += 1;
        break;
      case 'ExtraToppings':
        price += 2;
        break;
    }
  }

  return price;
}

/**
 * Calculates the total price of an entire order, which consists of multiple PizzaOrder objects.
 * This function uses Array.prototype.reduce for efficient iteration and summation,
 * as per the requirement to avoid recursion for potentially large inputs.
 *
 * @param {PizzaOrder[]} pizzaOrders An array of PizzaOrder objects.
 * @returns {number} The total cost of the entire order.
 */
export function orderPrice(pizzaOrders) {
  return pizzaOrders.reduce((total, order) => {
    // Pass the pizza name and spread the array of extras to the pizzaPrice function.
    const currentPizzaPrice = pizzaPrice(order.pizza, ...order.extras);
    return total + currentPizzaPrice;
  }, 0);
}
