export class DnDCharacter {
  // Ability scores
  public readonly strength: number;
  public readonly dexterity: number;
  public readonly constitution: number;
  public readonly intelligence: number;
  public readonly wisdom: number;
  public readonly charisma: number;
  public readonly hitpoints: number;

  constructor() {
    this.strength = DnDCharacter.generateAbilityScore();
    this.dexterity = DnDCharacter.generateAbilityScore();
    this.constitution = DnDCharacter.generateAbilityScore();
    this.intelligence = DnDCharacter.generateAbilityScore();
    this.wisdom = DnDCharacter.generateAbilityScore();
    this.charisma = DnDCharacter.generateAbilityScore();
    
    // Hitpoints = 10 + constitution modifier
    this.hitpoints = 10 + DnDCharacter.getModifierFor(this.constitution);
  }

  /**
   * Rolls 4d6, discards the lowest, and sums the top 3.
   */
  public static generateAbilityScore(): number {
    const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
    
    // Sort ascending and remove the first (lowest) element
    rolls.sort((a, b) => a - b);
    const topThree = rolls.slice(1);
    
    return topThree.reduce((sum, current) => sum + current, 0);
  }

  /**
   * Calculates the modifier: (score - 10) / 2, rounded down.
   */
  public static getModifierFor(abilityValue: number): number {
    return Math.floor((abilityValue - 10) / 2);
  }
}