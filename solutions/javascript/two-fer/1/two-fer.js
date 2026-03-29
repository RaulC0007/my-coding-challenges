// @ts-check

/**
 * Returns a string indicating how two cookies are distributed.
 * If a name is provided, one cookie goes to that person, and one to "me".
 * If no name is provided, one cookie goes to "you", and one to "me".
 *
 * @param {string} [name='you'] The name of the person to give a cookie to. Defaults to 'you'.
 * @returns {string} The dialogue for giving away the cookies.
 */
export const twoFer = (name = 'you') => {
  // Use a template literal for easy string interpolation.
  // The 'name' parameter will either be the provided name or the default 'you'.
  return `One for ${name}, one for me.`;
};
