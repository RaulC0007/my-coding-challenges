export function hey(message: string): string {
  // Trim whitespace from the message
  const trimmedMessage = message.trim();
  
  // Check for silence (empty or only whitespace)
  if (trimmedMessage === '') {
    return 'Fine. Be that way!';
  }
  
  // Check if the message is yelling (contains letters and all letters are uppercase)
  const hasLetters = /[a-zA-Z]/.test(trimmedMessage);
  const isYelling = hasLetters && trimmedMessage === trimmedMessage.toUpperCase();
  
  // Check if the message is a question (ends with '?')
  const isQuestion = trimmedMessage.endsWith('?');
  
  // Determine the response based on the conditions
  if (isYelling && isQuestion) {
    return "Calm down, I know what I'm doing!";
  } else if (isYelling) {
    return 'Whoa, chill out!';
  } else if (isQuestion) {
    return 'Sure.';
  } else {
    return 'Whatever.';
  }
}