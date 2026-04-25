class AnnalynsInfiltration {
    
    // Task 1: Fast attack possible if knight is sleeping
    public static boolean canFastAttack(boolean knightIsAwake) {
        return !knightIsAwake;
    }

    // Task 2: Can spy if at least one character is awake
    public static boolean canSpy(boolean knightIsAwake, boolean archerIsAwake, boolean prisonerIsAwake) {
        return knightIsAwake || archerIsAwake || prisonerIsAwake;
    }

    // Task 3: Can signal if prisoner is awake AND archer is sleeping
    public static boolean canSignalPrisoner(boolean archerIsAwake, boolean prisonerIsAwake) {
        return prisonerIsAwake && !archerIsAwake;
    }

    // Task 4: Can free prisoner under two scenarios
    public static boolean canFreePrisoner(boolean knightIsAwake, boolean archerIsAwake, 
                                          boolean prisonerIsAwake, boolean petDogIsPresent) {
        // Scenario 1: Dog is present + archer is sleeping
        if (petDogIsPresent && !archerIsAwake) {
            return true;
        }
        // Scenario 2: No dog + prisoner awake + both guards sleeping
        if (!petDogIsPresent && prisonerIsAwake && !knightIsAwake && !archerIsAwake) {
            return true;
        }
        return false;
    }
}