export function encode(numbers: number[]): number[] {
  if (!Array.isArray(numbers)) {
    throw new Error('Input must be array');
  }
  
  const result: number[] = [];
  
  for (let num of numbers) {
    if (num < 0 || num > 0xFFFFFFFF) {
      throw new Error('Number out of range (must be 32-bit unsigned integer)');
    }
    
    if (num === 0) {
      result.push(0);
      continue;
    }
    
    const chunks: number[] = [];
    let n = num;
    
    while (n > 0) {
      chunks.unshift(n & 0x7F);
      n >>>= 7;
    }
    
    for (let i = 0; i < chunks.length; i++) {
      if (i < chunks.length - 1) {
        chunks[i] |= 0x80;
      }
      result.push(chunks[i]);
    }
  }
  
  return result;
}

export function decode(bytes: number[]): number[] {
  if (!Array.isArray(bytes)) {
    throw new Error('Input must be array');
  }
  
  const result: number[] = [];
  let current = 0;
  let started = false;
  
  for (let i = 0; i < bytes.length; i++) {
    const byte = bytes[i];
    
    if (byte < 0 || byte > 0xFF) {
      throw new Error('Invalid byte value');
    }
    
    const hasContinuation = (byte & 0x80) !== 0;
    const value = byte & 0x7F;
    
    // Mark that we've started reading a number
    started = true;
    
    // Build the number using multiplication for 32-bit unsigned compatibility
    current = (current * 128) + value;
    
    if (!hasContinuation) {
      // Convert to unsigned 32-bit integer using >>> 0
      result.push(current >>> 0);
      current = 0;
      started = false;
    }
  }
  
  // If we finished loop but still have a number in progress (continuation bit never cleared)
  if (started) {
    throw new Error('Incomplete sequence');
  }
  
  return result;
}