export class Allergies {
  private score: number;
  private readonly allergens: Record<number, string> = {
    1: 'eggs',
    2: 'peanuts',
    4: 'shellfish',
    8: 'strawberries',
    16: 'tomatoes',
    32: 'chocolate',
    64: 'pollen',
    128: 'cats'
  };

  constructor(allergenIndex: number) {
    this.score = allergenIndex;
  }

  public list(): string[] {
    const allergies: string[] = [];
    
    for (const [value, allergen] of Object.entries(this.allergens)) {
      if (this.isAllergicTo(parseInt(value))) {
        allergies.push(allergen);
      }
    }
    
    return allergies;
  }

  public allergicTo(allergen: string): boolean {
    for (const [value, name] of Object.entries(this.allergens)) {
      if (name === allergen) {
        return this.isAllergicTo(parseInt(value));
      }
    }
    return false;
  }

  private isAllergicTo(value: number): boolean {
    return (this.score & value) === value;
  }
}