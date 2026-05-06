export class TwoBucket {
  private _moves: number | null = null;
  private _goalBucket: string = '';
  private _otherBucketValue: number = 0;
  private _solutionFound: boolean = false;

  constructor(
    private bucketOneCap: number,
    private bucketTwoCap: number,
    private goal: number,
    private startBucket: string
  ) {
    this.solve();
  }

  private calculateGCD(a: number, b: number): number {
    return b === 0 ? a : this.calculateGCD(b, a % b);
  }

  private isForbiddenState(b1: number, b2: number): boolean {
    // Forbidden: starting bucket empty AND other bucket full
    if (this.startBucket === 'one') {
      return b1 === 0 && b2 === this.bucketTwoCap;
    } else {
      return b2 === 0 && b1 === this.bucketOneCap;
    }
  }

  private solve(): void {
    // Check if goal is reachable
    if (this.goal > Math.max(this.bucketOneCap, this.bucketTwoCap)) {
      this._solutionFound = false;
      return;
    }

    const gcd = this.calculateGCD(this.bucketOneCap, this.bucketTwoCap);
    if (this.goal % gcd !== 0) {
      this._solutionFound = false;
      return;
    }

    const queue: { b1: number; b2: number; moves: number }[] = [];
    const visited = new Set<string>();

    // Initial state: fill the starting bucket (this is move 1)
    let initialB1: number, initialB2: number;
    if (this.startBucket === 'one') {
      initialB1 = this.bucketOneCap;
      initialB2 = 0;
    } else {
      initialB1 = 0;
      initialB2 = this.bucketTwoCap;
    }

    queue.push({ b1: initialB1, b2: initialB2, moves: 1 });
    visited.add(`${initialB1},${initialB2}`);

    while (queue.length > 0) {
      const current = queue.shift()!;

      // Check if goal is reached
      if (current.b1 === this.goal) {
        this._moves = current.moves;
        this._goalBucket = 'one';
        this._otherBucketValue = current.b2;
        this._solutionFound = true;
        return;
      }
      if (current.b2 === this.goal) {
        this._moves = current.moves;
        this._goalBucket = 'two';
        this._otherBucketValue = current.b1;
        this._solutionFound = true;
        return;
      }

      // Generate next states
      const nextStates = this.getNextStates(current.b1, current.b2, current.moves);

      for (const next of nextStates) {
        const key = `${next.b1},${next.b2}`;
        if (!visited.has(key)) {
          visited.add(key);
          queue.push(next);
        }
      }
    }

    this._solutionFound = false;
  }

  private getNextStates(
    b1: number,
    b2: number,
    moves: number
  ): { b1: number; b2: number; moves: number }[] {
    const nextStates: { b1: number; b2: number; moves: number }[] = [];
    const nextMoves = moves + 1;

    // Action 1: Fill bucket one
    if (b1 < this.bucketOneCap) {
      const newState = { b1: this.bucketOneCap, b2, moves: nextMoves };
      if (!this.isForbiddenState(newState.b1, newState.b2)) {
        nextStates.push(newState);
      }
    }

    // Action 2: Fill bucket two
    if (b2 < this.bucketTwoCap) {
      const newState = { b1, b2: this.bucketTwoCap, moves: nextMoves };
      if (!this.isForbiddenState(newState.b1, newState.b2)) {
        nextStates.push(newState);
      }
    }

    // Action 3: Empty bucket one
    if (b1 > 0) {
      const newState = { b1: 0, b2, moves: nextMoves };
      if (!this.isForbiddenState(newState.b1, newState.b2)) {
        nextStates.push(newState);
      }
    }

    // Action 4: Empty bucket two
    if (b2 > 0) {
      const newState = { b1, b2: 0, moves: nextMoves };
      if (!this.isForbiddenState(newState.b1, newState.b2)) {
        nextStates.push(newState);
      }
    }

    // Action 5: Pour bucket one into bucket two
    if (b1 > 0 && b2 < this.bucketTwoCap) {
      const pour = Math.min(b1, this.bucketTwoCap - b2);
      const newState = { b1: b1 - pour, b2: b2 + pour, moves: nextMoves };
      if (!this.isForbiddenState(newState.b1, newState.b2)) {
        nextStates.push(newState);
      }
    }

    // Action 6: Pour bucket two into bucket one
    if (b2 > 0 && b1 < this.bucketOneCap) {
      const pour = Math.min(b2, this.bucketOneCap - b1);
      const newState = { b1: b1 + pour, b2: b2 - pour, moves: nextMoves };
      if (!this.isForbiddenState(newState.b1, newState.b2)) {
        nextStates.push(newState);
      }
    }

    return nextStates;
  }

  public moves(): number {
    if (!this._solutionFound || this._moves === null) {
      throw new Error('No solution found');
    }
    return this._moves;
  }

  public get goalBucket(): string {
    if (!this._solutionFound) {
      throw new Error('No solution found');
    }
    return this._goalBucket;
  }

  public get otherBucket(): number {
    if (!this._solutionFound) {
      throw new Error('No solution found');
    }
    return this._otherBucketValue;
  }
}