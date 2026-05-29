export class Triangle {
  private sides: number[];

  constructor(...sides: number[]) {
    this.sides = sides;
  }

  private isValidTriangle(): boolean {
    const [a, b, c] = this.sides;
    
    // All sides must have positive length
    if (a <= 0 || b <= 0 || c <= 0) {
      return false;
    }
    
    // Triangle inequality theorem
    return a + b >= c && b + c >= a && a + c >= b;
  }

  get isEquilateral(): boolean {
    if (!this.isValidTriangle()) {
      return false;
    }
    
    const [a, b, c] = this.sides;
    return a === b && b === c;
  }

  get isIsosceles(): boolean {
    if (!this.isValidTriangle()) {
      return false;
    }
    
    const [a, b, c] = this.sides;
    return a === b || b === c || a === c;
  }

  get isScalene(): boolean {
    if (!this.isValidTriangle()) {
      return false;
    }
    
    const [a, b, c] = this.sides;
    return a !== b && b !== c && a !== c;
  }
}