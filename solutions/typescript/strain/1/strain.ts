export function keep<T>(collection: T[], predicate: (item: T) => boolean): T[] {
  const result: T[] = [];
  
  for (let i = 0; i < collection.length; i++) {
    if (predicate(collection[i])) {
      result.push(collection[i]);
    }
  }
  
  return result;
}

export function discard<T>(collection: T[], predicate: (item: T) => boolean): T[] {
  const result: T[] = [];
  
  for (let i = 0; i < collection.length; i++) {
    if (!predicate(collection[i])) {
      result.push(collection[i]);
    }
  }
  
  return result;
}