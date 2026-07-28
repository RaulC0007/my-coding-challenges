export const abilityModifier = (constitution) => {
  if (constitution < 3) {
    throw new Error('Ability scores must be at least 3');
  }
  if (constitution > 18) {
    throw new Error('Ability scores can be at most 18');
  }
  return Math.floor((constitution - 10) / 2);
};

export class Character {
  static rollAbility() {
    // Roll 4 six-sided dice
    const rolls = [];
    for (let i = 0; i < 4; i++) {
      rolls.push(Math.floor(Math.random() * 6) + 1);
    }
    
    // Sort rolls in descending order
    rolls.sort((a, b) => b - a);
    
    // Sum the largest 3 (remove the smallest)
    return rolls[0] + rolls[1] + rolls[2];
  }

  constructor() {
    this._strength = Character.rollAbility();
    this._dexterity = Character.rollAbility();
    this._constitution = Character.rollAbility();
    this._intelligence = Character.rollAbility();
    this._wisdom = Character.rollAbility();
    this._charisma = Character.rollAbility();
  }

  get strength() {
    return this._strength;
  }

  get dexterity() {
    return this._dexterity;
  }

  get constitution() {
    return this._constitution;
  }

  get intelligence() {
    return this._intelligence;
  }

  get wisdom() {
    return this._wisdom;
  }

  get charisma() {
    return this._charisma;
  }

  get hitpoints() {
    return 10 + abilityModifier(this._constitution);
  }
}