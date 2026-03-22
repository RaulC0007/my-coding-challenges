export const find = (array, value) => {
  if (!array || array.length === 0) {
    throw new Error('Value not in array');
  }

  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midValue = array[mid];

    if (midValue === value) {
      return mid; // Found the value, return its index
    } else if (midValue < value) {
      // Value is in the right half
      left = mid + 1;
    } else {
      // Value is in the left half
      right = mid - 1;
    }
  }

  throw new Error('Value not in array');
};