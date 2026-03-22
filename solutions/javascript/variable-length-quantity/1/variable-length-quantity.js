//
// This is only a SKELETON file for the 'Variable Length Quantity' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const encode = (numbers) => {
  if (!Array.isArray(numbers)) {
    throw new Error('Input must be an array');
  }
  
  let result = [];
  
  for (const num of numbers) {
    // Convert number to VLQ format
    let vlq = [];
    
    // Handle 32-bit unsigned integer
    let value = num >>> 0; // Ensure it's treated as unsigned 32-bit integer
    
    // Extract 7-bit chunks from the least significant bits
    if (value === 0) {
      vlq.push(0x00);
    } else {
      // First, collect all 7-bit groups
      let groups = [];
      while (value > 0) {
        groups.push(value & 0x7F); // Get the lowest 7 bits
        value = value >>> 7; // Shift right by 7 bits
      }
      
      // Process groups in reverse order (most significant first) to build VLQ
      for (let i = groups.length - 1; i >= 0; i--) {
        let byte = groups[i];
        // Set continuation bit for all but the last (least significant) byte
        if (i > 0) {
          byte |= 0x80; // Set the 8th bit
        }
        vlq.push(byte);
      }
    }
    
    result = result.concat(vlq);
  }
  
  return result;
};

export const decode = (bytes) => {
  if (!Array.isArray(bytes)) {
    throw new Error('Input must be an array');
  }
  
  const result = [];
  let i = 0;
  
  while (i < bytes.length) {
    let value = 0;
    let shift = 0;
    
    // Keep reading bytes until we find one without the continuation bit set
    while (true) {
      if (i >= bytes.length) {
        throw new Error('Incomplete sequence');
      }
      
      const byte = bytes[i];
      i++;
      
      // Extract the 7-bit value
      value = (value << 7) | (byte & 0x7F);
      
      // If the continuation bit is not set, this is the last byte
      if ((byte & 0x80) === 0) {
        break;
      }
    }
    
    // Convert to 32-bit unsigned integer
    result.push(value >>> 0);
  }
  
  return result;
};