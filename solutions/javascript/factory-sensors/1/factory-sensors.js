// @ts-check

/**
 * Custom error class for invalid arguments.
 * Extends the built-in Error class.
 */
export class ArgumentError extends Error {
  constructor(message = 'Invalid argument provided') {
    super(message);
    this.name = 'ArgumentError'; // Set the name property for easier identification
  }
}

/**
 * Custom error class for overheating machines.
 * Extends the built-in Error class and includes a 'temperature' property.
 */
export class OverheatingError extends Error {
  constructor(temperature) {
    super(`The machine is overheating! Temperature: ${temperature}°C`);
    this.name = 'OverheatingError'; // Set the name property
    this.temperature = temperature; // Store the temperature for specific handling
  }
}

// --- Task 1: checkHumidityLevel ---
/**
 * Checks the humidity level of the production room.
 * Throws an error if the humidity percentage exceeds 70%.
 *
 * @param {number} humidityPercentage The current humidity percentage.
 * @returns {void}
 * @throws {Error} If humidity exceeds 70%.
 */
export function checkHumidityLevel(humidityPercentage) {
  if (humidityPercentage > 70) {
    // The message is not important, so a generic error is fine.
    throw new Error('Humidity level too high!');
  }
  // If humidity is 70% or less, nothing is returned (implicitly undefined).
}

// --- Task 2: reportOverheating ---
/**
 * Reports overheating conditions based on temperature.
 * Throws specific custom errors for different issues.
 *
 * @param {number | null} temperature The current temperature or null if the sensor is broken.
 * @returns {void}
 * @throws {ArgumentError} If the sensor is broken (temperature is null).
 * @throws {OverheatingError} If the temperature exceeds 500°C.
 */
export function reportOverheating(temperature) {
  if (temperature === null) {
    // Sensor is broken, throw ArgumentError.
    throw new ArgumentError('Sensor is broken, cannot read temperature.');
  }

  if (temperature > 500) {
    // Machine is overheating, throw OverheatingError with the temperature.
    throw new OverheatingError(temperature);
  }
  // If temperature is within limits and sensor works, nothing is returned.
}

// --- Task 3: monitorTheMachine ---
/**
 * Monitors the machine and reacts to different error types.
 *
 * @param {object} actions An object containing functions for different actions.
 * @param {function(): void} actions.check A function that checks temperature and may throw errors.
 * @param {function(): void} actions.alertDeadSensor A function to alert technicians about a dead sensor.
 * @param {function(): void} actions.alertOverheating A function to turn on a warning light.
 * @param {function(): void} actions.shutdown A function to turn off the machine.
 * @returns {void}
 * @throws {Error} Rethrows any unrecognized errors.
 */
export function monitorTheMachine(actions) {
  try {
    // Attempt to check the machine's temperature.
    actions.check();
  } catch (error) {
    // Use instanceof to differentiate between custom error types.
    if (error instanceof ArgumentError) {
      // If the sensor is dead, alert the technician.
      actions.alertDeadSensor();
    } else if (error instanceof OverheatingError) {
      // If overheating, execute the overheating protocol.
      // The temperature is available via the 'temperature' property of the error.
      if (error.temperature < 600) {
        actions.alertOverheating(); // Turn on warning light
      } else {
        actions.shutdown(); // Critical situation, shut down
      }
    } else {
      // For any other unrecognized error, rethrow it.
      throw error;
    }
  }
}