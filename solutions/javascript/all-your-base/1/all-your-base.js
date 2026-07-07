export const convert = (digits, inputBase, outputBase) => {
  // Validate bases
  if (inputBase < 2) {
    throw new Error('Wrong input base');
  }
  if (outputBase < 2) {
    throw new Error('Wrong output base');
  }
  
  // Validate digits array
  if (!Array.isArray(digits) || digits.length === 0) {
    throw new Error('Input has wrong format');
  }
  
  // Check for leading zeros
  if (digits.length > 1 && digits[0] === 0) {
    throw new Error('Input has wrong format');
  }
  
  // Validate each digit
  for (const digit of digits) {
    if (typeof digit !== 'number' || digit < 0 || digit >= inputBase) {
      throw new Error('Input has wrong format');
    }
  }
  
  // Handle zero
  if (digits.length === 1 && digits[0] === 0) {
    return [0];
  }
  
  // Convert from input base to decimal
  let decimalValue = 0;
  for (let i = 0; i < digits.length; i++) {
    decimalValue = decimalValue * inputBase + digits[i];
  }
  
  // Convert from decimal to output base
  const outputDigits = [];
  let remaining = decimalValue;
  
  while (remaining > 0) {
    outputDigits.unshift(remaining % outputBase);
    remaining = Math.floor(remaining / outputBase);
  }
  
  return outputDigits;
};