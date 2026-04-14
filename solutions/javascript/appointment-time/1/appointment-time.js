// @ts-check

/**
 * Create an appointment 'days' from now at the current time.
 *
 * @param {number} days The number of days from now.
 * @param {number} [now] (ms since the epoch, or undefined). If undefined, uses current time.
 * @returns {Date} The appointment date.
 */
export function createAppointment(days, now = undefined) {
  // If 'now' is provided, create a Date object from that timestamp.
  // Otherwise, create a Date object representing the current time.
  const appointment = now === undefined ? new Date() : new Date(now);

  // Add the specified number of days to the current date.
  // setDate() handles month and year rollovers automatically.
  appointment.setDate(appointment.getDate() + days);

  return appointment;
}

/**
 * Generate the appointment timestamp in ISO 8601 format.
 *
 * @param {Date} appointmentDate The Date object representing the appointment.
 * @returns {string} The timestamp in ISO 8601 format.
 */
export function getAppointmentTimestamp(appointmentDate) {
  // The toISOString() method directly returns the date in ISO 8601 format (UTC).
  return appointmentDate.toISOString();
}

/**
 * Get details of an appointment from an ISO 8601 timestamp.
 *
 * @param {string} timestamp (ISO 8601) The ISO 8601 timestamp string.
 * @returns {Record<'year' | 'month' | 'date' | 'hour' | 'minute', number>} The appointment details.
 */
export function getAppointmentDetails(timestamp) {
  // Create a Date object from the ISO 8601 timestamp string.
  const date = new Date(timestamp);

  // Extract the required components.
  // Note: getMonth() returns 0-11, so it matches the problem's example output (month: 3 for April).
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    date: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
  };
}

/**
 * Update an appointment with given options.
 *
 * @param {string} timestamp (ISO 8601) The original appointment timestamp.
 * @param {Partial<Record<'year' | 'month' | 'date' | 'hour' | 'minute', number>>} options An object with properties to update.
 * @returns {Record<'year' | 'month' | 'date' | 'hour' | 'minute', number>} The updated appointment details.
 */
export function updateAppointment(timestamp, options) {
  // Create a mutable Date object from the original timestamp.
  const date = new Date(timestamp);

  // Apply updates from the options object.
  // setFullYear, setMonth, setDate, setHours, setMinutes will modify the date object.
  if (options.year !== undefined) {
    date.setFullYear(options.year);
  }
  if (options.month !== undefined) {
    date.setMonth(options.month);
  }
  if (options.date !== undefined) {
    date.setDate(options.date);
  }
  if (options.hour !== undefined) {
    date.setHours(options.hour);
  }
  if (options.minute !== undefined) {
    date.setMinutes(options.minute);
  }

  // Return the details of the updated appointment.
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    date: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
  };
}

/**
 * Get available time in seconds (rounded) between two appointments.
 *
 * @param {string} timestampA (ISO 8601) The first appointment timestamp.
 * @param {string} timestampB (ISO 8601) The second appointment timestamp.
 * @returns {number} The difference in seconds, rounded to the nearest whole number.
 */
export function timeBetween(timestampA, timestampB) {
  const dateA = new Date(timestampA);
  const dateB = new Date(timestampB);

  // Get the time in milliseconds since epoch for both dates.
  const timeA_ms = dateA.getTime();
  const timeB_ms = dateB.getTime();

  // Calculate the absolute difference in milliseconds.
  const difference_ms = Math.abs(timeB_ms - timeA_ms);

  // Convert milliseconds to seconds and round to the nearest whole number.
  return Math.round(difference_ms / 1000);
}

/**
 * Checks if an appointment is valid (i.e., in the future).
 *
 * @param {string} appointmentTimestamp (ISO 8601) The appointment timestamp.
 * @param {string} currentTimestamp (ISO 8601) The current time timestamp.
 * @returns {boolean} True if the appointment is in the future, false otherwise.
 */
export function isValid(appointmentTimestamp, currentTimestamp) {
  const appointmentDate = new Date(appointmentTimestamp);
  const currentDate = new Date(currentTimestamp);

  // Compare the two Date objects.
  // Date objects can be directly compared using relational operators,
  // which implicitly converts them to their millisecond timestamps.
  return appointmentDate > currentDate;
}