// Task 1: Fast Attack
export function canExecuteFastAttack(knightIsAwake) {
  return !knightIsAwake;
}

// Task 2: Spy
export function canSpy(knightIsAwake, archerIsAwake, prisonerIsAwake) {
  return knightIsAwake || archerIsAwake || prisonerIsAwake;
}

// Task 3: Signal Prisoner
export function canSignalPrisoner(archerIsAwake, prisonerIsAwake) {
  return prisonerIsAwake && !archerIsAwake;
}

// Task 4: Free Prisoner
export function canFreePrisoner(
  knightIsAwake,
  archerIsAwake,
  prisonerIsAwake,
  petDogIsPresent
) {
  return (
    (petDogIsPresent && !archerIsAwake) ||
    (!petDogIsPresent && prisonerIsAwake && !knightIsAwake && !archerIsAwake)
  );
}