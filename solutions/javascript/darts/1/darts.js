export const score = (x, y) => {
  // Calculate the distance from the center (0,0) using Pythagorean theorem
  const distance = Math.sqrt(x * x + y * y);
  
  // Check which circle the dart landed in
  if (distance <= 1) {
    return 10; // Inner circle (bullseye)
  } else if (distance <= 5) {
    return 5; // Middle circle
  } else if (distance <= 10) {
    return 1; // Outer circle
  } else {
    return 0; // Outside the target
  }
};