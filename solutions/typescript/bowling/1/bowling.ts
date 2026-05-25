export class Bowling {
  private rolls: number[] = [];
  private currentFrameTries = 0;
  private currentFramePins = 0;
  private frameCount = 1;

  public roll(pins: number): void {
    // 1. Validaciones básicas con los mensajes exactos del test
    if (pins < 0) {
      throw new Error('Negative roll is invalid');
    }
    if (pins > 10) {
      throw new Error('Pin count exceeds pins on the lane');
    }
    if (this.isGameOver()) {
      throw new Error('Cannot roll after game is over');
    }

    // 2. Validar que no se derriben más de 10 pines en un mismo frame (Frames 1 al 9)
    if (this.frameCount < 10) {
      if (this.currentFrameTries === 0) {
        if (pins === 10) {
          // Es un Strike: avanzamos de frame inmediatamente
          this.rolls.push(pins);
          this.frameCount++;
        } else {
          this.currentFrameTries = 1;
          this.currentFramePins = pins;
          this.rolls.push(pins);
        }
      } else {
        if (this.currentFramePins + pins > 10) {
          throw new Error('Pin count exceeds pins on the lane');
        }
        this.rolls.push(pins);
        this.currentFrameTries = 0;
        this.currentFramePins = 0;
        this.frameCount++;
      }
    } else {
      // 3. Validaciones especiales para el Frame 10 (Manejo de bolas de relleno)
      const frame10RollsCount = this.rolls.length - this.getRollsBeforeFrame10();
      
      if (frame10RollsCount === 1 && this.rolls[this.rolls.length - 1] < 10) {
        if (this.rolls[this.rolls.length - 1] + pins > 10) {
          throw new Error('Pin count exceeds pins on the lane');
        }
      } else if (frame10RollsCount === 2) {
        const firstIn10 = this.rolls[this.getRollsBeforeFrame10()];
        const secondIn10 = this.rolls[this.getRollsBeforeFrame10() + 1];
        if (firstIn10 === 10 && secondIn10 < 10 && secondIn10 + pins > 10) {
          throw new Error('Pin count exceeds pins on the lane');
        }
      }
      
      this.rolls.push(pins);
    }
  }

  public score(): number {
    if (!this.isGameOver()) {
      throw new Error('Score cannot be taken until the end of the game');
    }

    let totalScore = 0;
    let rollIndex = 0;

    for (let frame = 0; frame < 10; frame++) {
      if (this.isStrike(rollIndex)) {
        totalScore += 10 + this.rolls[rollIndex + 1] + this.rolls[rollIndex + 2];
        rollIndex += 1;
      } else if (this.isSpare(rollIndex)) {
        totalScore += 10 + this.rolls[rollIndex + 2];
        rollIndex += 2;
      } else {
        totalScore += this.rolls[rollIndex] + this.rolls[rollIndex + 1];
        rollIndex += 2;
      }
    }

    return totalScore;
  }

  // --- Métodos Auxiliares de Estado ---

  private isStrike(rollIndex: number): boolean {
    return this.rolls[rollIndex] === 10;
  }

  private isSpare(rollIndex: number): boolean {
    return this.rolls[rollIndex] + this.rolls[rollIndex + 1] === 10;
  }

  private getRollsBeforeFrame10(): number {
    let rollIndex = 0;
    for (let frame = 0; frame < 9; frame++) {
      if (this.rolls[rollIndex] === 10) {
        rollIndex += 1;
      } else {
        rollIndex += 2;
      }
    }
    return rollIndex;
  }

  private isGameOver(): boolean {
    if (this.frameCount < 10) return false;
    
    const startOfFrame10 = this.getRollsBeforeFrame10();
    const frame10Rolls = this.rolls.length - startOfFrame10;

    if (frame10Rolls < 2) return false;

    const firstIn10 = this.rolls[startOfFrame10];
    const secondIn10 = this.rolls[startOfFrame10 + 1];

    if (firstIn10 === 10 || firstIn10 + secondIn10 === 10) {
      return frame10Rolls === 3;
    }

    return frame10Rolls === 2;
  }
}