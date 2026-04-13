// Function to translate a coordinate pair by a given dx and dy
function translate2d(dx, dy) {
  return function(x, y) {
    return [x + dx, y + dy];
  };
}

// Function to scale a coordinate pair by given scaling factors sx and sy
function scale2d(sx, sy) {
  return function(x, y) {
    return [x * sx, y * sy];
  };
}

// Function to compose two transformations
function composeTransform(f, g) {
  return function(x, y) {
    const intermediate = f(x, y);
    return g(intermediate[0], intermediate[1]);
  };
}

// Function to memoize a transformation function
function memoizeTransform(fn) {
  let lastArgs = null;
  let lastResult = null;

  return function(x, y) {
    if (lastArgs && lastArgs[0] === x && lastArgs[1] === y) {
      return lastResult;
    }
    lastArgs = [x, y];
    lastResult = fn(x, y);
    return lastResult;
  };
}

// Export the functions so they can be used by the test suite
export { translate2d, scale2d, composeTransform, memoizeTransform };
