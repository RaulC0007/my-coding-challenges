export class Robot {
  private static usedNames = new Set<string>();
  private _name: string | null = null;

  constructor() {}

  public get name(): string {
    if (this._name === null) {
      this._name = this.generateUniqueName();
    }
    return this._name;
  }

  public resetName(): void {
    this._name = null;
  }

  public static releaseNames(): void {
    Robot.usedNames.clear();
  }

  private generateUniqueName(): string {
    let newName: string;
    do {
      newName = this.generateRandomName();
    } while (Robot.usedNames.has(newName));
    
    Robot.usedNames.add(newName);
    return newName;
  }

  private generateRandomName(): string {
    // Generate two random uppercase letters (A-Z)
    const letters = Array.from({ length: 2 }, () => {
      const charCode = Math.floor(Math.random() * 26) + 65; // 65 = 'A'
      return String.fromCharCode(charCode);
    }).join('');
    
    // Generate three random digits (0-9)
    const digits = Array.from({ length: 3 }, () => {
      return Math.floor(Math.random() * 10).toString();
    }).join('');
    
    return letters + digits;
  }
}