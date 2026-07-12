export const truncate = (input) => {
  // Use spread operator to split by code points (not code units)
  const characters = [...input];
  
  // Take only the first 5 characters
  const truncated = characters.slice(0, 5);
  
  // Join back into a string
  return truncated.join('');
};