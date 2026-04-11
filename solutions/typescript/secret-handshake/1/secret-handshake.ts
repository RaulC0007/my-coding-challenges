export function commands(number: number): string[] {
  const actions: string[] = [];
  
  // Check each bit position and add corresponding action
  if (number & 1) { // Bit 0: 00001
    actions.push("wink");
  }
  
  if (number & 2) { // Bit 1: 00010
    actions.push("double blink");
  }
  
  if (number & 4) { // Bit 2: 00100
    actions.push("close your eyes");
  }
  
  if (number & 8) { // Bit 3: 01000
    actions.push("jump");
  }
  
  if (number & 16) { // Bit 4: 10000 - Reverse the order
    actions.reverse();
  }
  
  return actions;
}