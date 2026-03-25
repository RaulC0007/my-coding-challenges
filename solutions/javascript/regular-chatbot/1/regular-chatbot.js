// @ts-check

/**
 * Checks if a user command is valid.
 * A command is valid if it starts with "Chatbot" (case-insensitive).
 *
 * @param {string} command The user's command string.
 * @returns {boolean} True if the command is valid, false otherwise.
 */
export function isValidCommand(command) {
  // Use a regex literal: /^Chatbot/i
  // ^ asserts position at the start of the string.
  // Chatbot matches the literal string "Chatbot".
  // i flag makes the match case-insensitive.
  return /^Chatbot/i.test(command);
}

/**
 * Removes encrypted emojis from a message.
 * Emojis are represented as "emoji" followed by an ID number (e.g., "emoji3465").
 * Uses constructor syntax for the regex.
 *
 * @param {string} message The input message string.
 * @returns {string} The message with emojis removed.
 */
export function removeEmoji(message) {
  // Use RegExp constructor: new RegExp('emoji\\d+', 'g')
  // emoji matches the literal string "emoji".
  // \\d+ matches one or more digits (escaped \ because it's in a string).
  // g flag ensures all occurrences are replaced, not just the first.
  const emojiRegex = new RegExp('emoji\\d+', 'g');
  return message.replace(emojiRegex, ''); // Replace matched emojis with an empty string.
}

/**
 * Checks if a phone number matches the expected format: (+##) ###-###-###.
 * Returns a confirmation message for valid numbers, or an error for invalid ones.
 *
 * @param {string} number The phone number string to validate.
 * @returns {string} A confirmation or error message.
 */
export function checkPhoneNumber(number) {
  // Regex for the specific phone number format:
  // ^ asserts position at the start of the string.
  // \\( matches an opening parenthesis (needs to be escaped).
  // \\+ matches a literal plus sign (needs to be escaped).
  // \\d{2} matches exactly two digits.
  // \\) matches a closing parenthesis (needs to be escaped).
  // \\s matches a single whitespace character.
  // \\d{3} matches exactly three digits.
  // - matches a literal hyphen.
  // $ asserts position at the end of the string.
  const phoneRegex = /^\(\+\d{2}\)\s\d{3}-\d{3}-\d{3}$/;

  if (phoneRegex.test(number)) {
    return `Thanks! You can now download me to your phone.`;
  } else {
    return `Oops, it seems like I can't reach out to ${number}`;
  }
}

/**
 * Extracts URL links from a user's input string.
 *
 * @param {string} userInput The user's input string.
 * @returns {string[] | null} An array of found URLs, or null if none are found.
 */
export function getURL(userInput) {
  // Regex to capture a basic website link like example.org or sub.domain.com
  // [a-z0-9.-]+ matches one or more alphanumeric characters, dots, or hyphens.
  // \\.[a-z]{2,} matches a dot followed by at least two letters (for top-level domain).
  // The global flag 'g' is crucial to find all occurrences.
  const urlRegex = /[a-z0-9.-]+\.[a-z]{2,}/g;
  return userInput.match(urlRegex);
}

/**
 * Greets the user, reformatting their full name from "Lastname, Firstname" to "Firstname Lastname".
 * Uses the String.prototype.replace() method with a regex and a replacement function/pattern.
 *
 * @param {string} fullName The user's full name in "Lastname, Firstname" format.
 * @returns {string} A greeting string with the name reformatted.
 */
export function niceToMeetYou(fullName) {
  // Regex to capture parts of the name:
  // ^ asserts start of string.
  // (\\w+) captures the first word (Lastname) into group 1.
  // ,\\s+ matches the comma and one or more spaces.
  // (\\w+)$ captures the last word (Firstname) into group 2, asserting end of string.
  const nameRegex = /^(\w+),\s*(\w+)$/;

  // The replace method can take a function or a replacement string with capture group references.
  // Here, we use '$2 $1' to reorder the captured groups.
  // $2 refers to the second captured group (Firstname).
  // $1 refers to the first captured group (Lastname).
  const reformattedName = fullName.replace(nameRegex, '$2 $1');

  return `Nice to meet you, ${reformattedName}`;
}