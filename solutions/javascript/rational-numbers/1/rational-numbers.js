//
// This is only a SKELETON file for the 'Rational Numbers' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export class Rational {
  constructor(numerator, denominator = 1) {
    if (denominator === 0) {
      throw new Error('Denominator cannot be zero');
    }
    
    // Handle sign: ensure denominator is positive
    if (denominator < 0) {
      numerator = -numerator;
      denominator = -denominator;
    }
    
    // Reduce to lowest terms
    const gcdValue = this.gcd(Math.abs(numerator), Math.abs(denominator));
    this.numerator = numerator / gcdValue;
    this.denominator = denominator / gcdValue;
  }

  // Greatest Common Divisor function
  gcd(a, b) {
    while (b !== 0) {
      let temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }

  add(other) {
    const newNumerator = this.numerator * other.denominator + other.numerator * this.denominator;
    const newDenominator = this.denominator * other.denominator;
    return new Rational(newNumerator, newDenominator);
  }

  sub(other) {
    const newNumerator = this.numerator * other.denominator - other.numerator * this.denominator;
    const newDenominator = this.denominator * other.denominator;
    return new Rational(newNumerator, newDenominator);
  }

  mul(other) {
    const newNumerator = this.numerator * other.numerator;
    const newDenominator = this.denominator * other.denominator;
    return new Rational(newNumerator, newDenominator);
  }

  div(other) {
    if (other.numerator === 0) {
      throw new Error('Cannot divide by zero');
    }
    const newNumerator = this.numerator * other.denominator;
    const newDenominator = this.denominator * other.numerator;
    return new Rational(newNumerator, newDenominator);
  }

  abs() {
    return new Rational(Math.abs(this.numerator), this.denominator);
  }

  exprational(power) {
    if (power >= 0) {
      return new Rational(
        Math.pow(this.numerator, power),
        Math.pow(this.denominator, power)
      );
    } else {
      const absPower = Math.abs(power);
      return new Rational(
        Math.pow(this.denominator, absPower),
        Math.pow(this.numerator, absPower)
      );
    }
  }

  expreal(base) {
    // Handle floating point precision issues
    const result = Math.pow(base, this.numerator / this.denominator);
    // Round to handle floating point precision
    return parseFloat(result.toFixed(12));
  }

  reduce() {
    // Return a new rational number in reduced form (already done in constructor)
    return new Rational(this.numerator, this.denominator);
  }
}