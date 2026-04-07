/**
 * Creates a new visitor object.
 *
 * @param {string} name The name of the visitor.
 * @param {number} age The age of the visitor.
 * @param {string} ticketId The identifier of the ticket.
 * @returns {object} The new visitor object.
 */
export function createVisitor(name, age, ticketId) {
  return {
    name: name,
    age: age,
    ticketId: ticketId,
  };
}

/**
 * Revokes a visitor's ticket by setting their ticketId to null.
 *
 * @param {object} visitor The visitor object.
 * @returns {object} The modified visitor object with a null ticketId.
 */
export function revokeTicket(visitor) {
  visitor.ticketId = null;
  return visitor;
}

/**
 * Determines the status of a ticket.
 *
 * @param {object} tickets The ticket tracking object.
 * @param {string} ticketId The identifier of the ticket to check.
 * @returns {string} The ticket status string.
 */
export function ticketStatus(tickets, ticketId) {
  if (tickets[ticketId] === undefined) {
    return 'unknown ticket id';
  }

  if (tickets[ticketId] === null) {
    return 'not sold';
  }

  return `sold to ${tickets[ticketId]}`;
}

/**
 * Provides a simplified ticket status response.
 *
 * @param {object} tickets The ticket tracking object.
 * @param {string} ticketId The identifier of the ticket to check.
 * @returns {string} The visitor's name if sold, or 'invalid ticket !!!' otherwise.
 */
export function simpleTicketStatus(tickets, ticketId) {
  const status = tickets[ticketId];
  return status ?? 'invalid ticket !!!';
}

/**
 * Determines the GTC version from a visitor object.
 *
 * @param {object} visitor The visitor object.
 * @returns {string | undefined} The GTC version if available, otherwise undefined.
 */
export function gtcVersion(visitor) {
  return visitor.gtc?.version;
}