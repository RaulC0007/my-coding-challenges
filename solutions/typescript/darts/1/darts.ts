export function score(x: number, y: number): number {
  // Calculate the distance from the center (0, 0)
  const distance = Math.sqrt(x * x + y * y);
  
  // Check where the dart landed
  if (distance > 10) {
    return 0; // Outside the target
  } else if (distance > 5) {
    return 1; // Outer circle
  } else if (distance > 1) {
    return 5; // Middle circle
  } else {
    return 10; // Inner circle (bullseye)
  }
}