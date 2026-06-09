export function isPaired(input: string): boolean {
  const stack: string[] = [];
  const opening = '([{';
  const closing = ')]}';
  const pairs: { [key: string]: string } = {
    ')': '(',
    ']': '[',
    '}': '{'
  };
  
  for (const char of input) {
    if (opening.includes(char)) {
      // Opening bracket: push to stack
      stack.push(char);
    } else if (closing.includes(char)) {
      // Closing bracket: check if matches the most recent opening bracket
      const lastOpening = stack.pop();
      if (lastOpening !== pairs[char]) {
        return false;
      }
    }
    // Ignore all other characters
  }
  
  // All brackets are matched if the stack is empty
  return stack.length === 0;
}