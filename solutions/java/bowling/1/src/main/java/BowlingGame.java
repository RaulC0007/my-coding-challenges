import java.util.ArrayList;
import java.util.List;

class BowlingGame {
    private final List<Integer> rolls = new ArrayList<>();
    private int currentFrame = 1;
    private int rollsInFrame = 0;
    private boolean isGameOver = false;
    private int pinsRemainingInFrame = 10;

    void roll(int pins) {
        // Validation
        if (isGameOver) {
            throw new IllegalStateException("Cannot roll after game is over");
        }
        if (pins < 0) {
            throw new IllegalStateException("Negative roll is invalid");
        }
        if (pins > pinsRemainingInFrame) {
            throw new IllegalStateException("Pin count exceeds pins on the lane");
        }

        // Record roll
        rolls.add(pins);
        rollsInFrame++;
        pinsRemainingInFrame -= pins;

        // Frame progression
        if (currentFrame < 10) {
            // Standard frame: complete on strike (pins = 0) or 2 rolls
            if (pinsRemainingInFrame == 0 || rollsInFrame == 2) {
                currentFrame++;
                rollsInFrame = 0;
                pinsRemainingInFrame = 10;
            }
        } else {
            // 10th frame special rules
            if (rollsInFrame == 1) {
                if (pins == 10) {
                    pinsRemainingInFrame = 10; // Strike: reset pins
                }
            } else if (rollsInFrame == 2) {
                int firstRoll = rolls.get(rolls.size() - 2);
                if (firstRoll == 10) {
                    // Previous was a strike
                    if (pins == 10) {
                        pinsRemainingInFrame = 10; // Another strike: reset pins
                    }
                    // Otherwise pins remain for 3rd roll
                } else if (firstRoll + pins == 10) {
                    pinsRemainingInFrame = 10; // Spare: reset pins
                } else {
                    isGameOver = true; // Open frame: game over
                }
            } else if (rollsInFrame == 3) {
                isGameOver = true; // Used all 10th frame rolls
            }
        }
    }

    int score() {
        if (!isGameOver) {
            throw new IllegalStateException("Score cannot be taken until the end of the game");
        }

        int score = 0;
        int rollIndex = 0;

        for (int frame = 0; frame < 10; frame++) {
            if (frame < 9) {
                // Frames 1-9
                if (rolls.get(rollIndex) == 10) {
                    // Strike: 10 + next 2 rolls
                    score += 10 + rolls.get(rollIndex + 1) + rolls.get(rollIndex + 2);
                    rollIndex++;
                } else if (rolls.get(rollIndex) + rolls.get(rollIndex + 1) == 10) {
                    // Spare: 10 + next 1 roll
                    score += 10 + rolls.get(rollIndex + 2);
                    rollIndex += 2;
                } else {
                    // Open frame: sum of rolls
                    score += rolls.get(rollIndex) + rolls.get(rollIndex + 1);
                    rollIndex += 2;
                }
            } else {
                // 10th frame: sum all remaining rolls
                for (int i = rollIndex; i < rolls.size(); i++) {
                    score += rolls.get(i);
                }
            }
        }

        return score;
    }
}