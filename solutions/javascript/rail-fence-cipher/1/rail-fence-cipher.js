export const encode = (text, numRails) => {
  if (numRails < 2) return text;
  
  const rails = Array.from({ length: numRails }, () => []);
  let currentRail = 0;
  let direction = 1;

  for (const char of text) {
    rails[currentRail].push(char);
    
    // Move to the next rail
    currentRail += direction;
    
    // Reverse direction if we hit the top or bottom rail
    if (currentRail === 0 || currentRail === numRails - 1) {
      direction *= -1;
    }
  }

  // Join all rails into a single ciphertext string
  return rails.map(rail => rail.join('')).join('');
};

export const decode = (text, numRails) => {
  if (numRails < 2) return text;
  
  // Step 1: Calculate the exact length of each rail
  const railLengths = new Array(numRails).fill(0);
  let currentRail = 0;
  let direction = 1;

  for (let i = 0; i < text.length; i++) {
    railLengths[currentRail]++;
    
    currentRail += direction;
    if (currentRail === 0 || currentRail === numRails - 1) {
      direction *= -1;
    }
  }

  // Step 2: Slice the ciphertext into the reconstructed rails
  const rails = [];
  let pointer = 0;
  for (let i = 0; i < numRails; i++) {
    // We split the slice into an array so we can use .shift() later
    rails.push(text.slice(pointer, pointer + railLengths[i]).split(''));
    pointer += railLengths[i];
  }

  // Step 3: Reconstruct the original text by reading out the zig-zag
  let decoded = '';
  currentRail = 0;
  direction = 1;

  for (let i = 0; i < text.length; i++) {
    decoded += rails[currentRail].shift();
    
    currentRail += direction;
    if (currentRail === 0 || currentRail === numRails - 1) {
      direction *= -1;
    }
  }

  return decoded;
};
