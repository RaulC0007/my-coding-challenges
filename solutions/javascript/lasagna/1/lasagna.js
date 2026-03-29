// Task 1: Define the expected oven time
export const EXPECTED_MINUTES_IN_OVEN = 40;

// Task 2: Calculate remaining oven time
export function remainingMinutesInOven(actualMinutesInOven) {
  return EXPECTED_MINUTES_IN_OVEN - actualMinutesInOven;
}

// Task 3: Calculate preparation time
export function preparationTimeInMinutes(numberOfLayers) {
  return numberOfLayers * 2;
}

// Task 4: Calculate total working time
export function totalTimeInMinutes(numberOfLayers, actualMinutesInOven) {
  return preparationTimeInMinutes(numberOfLayers) + actualMinutesInOven;
}