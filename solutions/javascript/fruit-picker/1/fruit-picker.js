// Assume 'notify' and 'order' are provided globally or imported by the test environment.
// For example, if they were in a file called 'external-api.js':
// import { notify, order } from './external-api';

// Placeholder for 'notify' and 'order' for local testing if not provided by environment.
// In Exercism, these are usually handled by the test runner.
// function notify(message) { console.log('Notifying:', message); }
// function order(query, success, error) {
//   console.log('Placing order:', query);
//   // Simulate success or failure for testing
//   if (query.quantity < 100) {
//     success();
//   } else {
//     error();
//   }
// }


/**
 * Callback function to notify the customer of a successful order.
 * It invokes the external 'notify' function with a success message.
 */
export function onSuccess() {
  notify({ message: 'SUCCESS' });
}

/**
 * Callback function to notify the customer of an unsuccessful order.
 * It invokes the external 'notify' function with an error message.
 */
export function onError() {
  notify({ message: 'ERROR' });
}

/**
 * Wraps the grocer's API 'order' function.
 * It takes a query and two callback functions (success and error) and forwards them.
 *
 * @param {object} query The order query object ({ variety: string, quantity: number }).
 * @param {function} successCallback The callback to invoke on successful order.
 * @param {function} errorCallback The callback to invoke on order error.
 */
export function orderFromGrocer(query, successCallback, errorCallback) {
  order(query, successCallback, errorCallback);
}

/**
 * Helper function to simplify placing an order with the grocer.
 * It takes variety and quantity, and uses the pre-defined success and error callbacks.
 *
 * @param {string} variety The variety of fruit.
 * @param {number} quantity The quantity of fruit.
 */
export function postOrder(variety, quantity) {
  const query = { variety: variety, quantity: quantity };
  // Use the previously defined orderFromGrocer, onSuccess, and onError functions.
  orderFromGrocer(query, onSuccess, onError);
}