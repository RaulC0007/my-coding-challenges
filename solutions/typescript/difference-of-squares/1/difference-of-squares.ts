export class Squares {
  private n: number;

  constructor(count: number) {
    this.n = count;
  }

  get sumOfSquares(): number {
    return Array.from({ length: this.n }, (_, i) => (i + 1) * (i + 1))
      .reduce((acc, val) => acc + val, 0);
  }

  get squareOfSum(): number {
    const sum = Array.from({ length: this.n }, (_, i) => i + 1)
      .reduce((acc, val) => acc + val, 0);
    return sum * sum;
  }

  get difference(): number {
    return this.squareOfSum - this.sumOfSquares;
  }
}