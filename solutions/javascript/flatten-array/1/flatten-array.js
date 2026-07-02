export const flatten = (array) => {
  const result = [];

  function flattenHelper(input) {
    if (!Array.isArray(input)) {
      return;
    }

    for (const item of input) {
      if (Array.isArray(item)) {
        flattenHelper(item);
      } else if (item !== null && item !== undefined) {
        result.push(item);
      }
    }
  }

  flattenHelper(array);
  return result;
};

