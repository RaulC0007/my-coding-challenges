export const keep = (collection, predicate) => {
  const result = [];
  for (let i = 0; i < collection.length; i++) {
    if (predicate(collection[i])) {
      result.push(collection[i]);
    }
  }
  return result;
};

export const discard = (collection, predicate) => {
  const result = [];
  for (let i = 0; i < collection.length; i++) {
    if (!predicate(collection[i])) {
      result.push(collection[i]);
    }
  }
  return result;
};
