export class Rational {
  public numerator: number;
  public denominator: number;

  constructor(numerator: number, denominator: number) {
    if (denominator === 0) {
      throw new Error('Denominator cannot be zero');
    }
    this.numerator = numerator;
    this.denominator = denominator;
    this.reduce();
  }

  // --- MÉTODOS DE OPERACIÓN ---
  add(other: Rational): Rational {
    return new Rational(
      this.numerator * other.denominator + other.numerator * this.denominator,
      this.denominator * other.denominator
    );
  }

  sub(other: Rational): Rational {
    return new Rational(
      this.numerator * other.denominator - other.numerator * this.denominator,
      this.denominator * other.denominator
    );
  }

  mul(other: Rational): Rational {
    return new Rational(
      this.numerator * other.numerator,
      this.denominator * other.denominator
    );
  }

  div(other: Rational): Rational {
    if (other.numerator === 0) {
      throw new Error('Cannot divide by zero');
    }
    return new Rational(
      this.numerator * other.denominator,
      this.denominator * other.numerator
    );
  }

  abs(): Rational {
    return new Rational(Math.abs(this.numerator), Math.abs(this.denominator));
  }

  exprational(n: number): Rational {
    return n >= 0 
      ? new Rational(Math.pow(this.numerator, n), Math.pow(this.denominator, n))
      : new Rational(Math.pow(this.denominator, Math.abs(n)), Math.pow(this.numerator, Math.abs(n)));
  }

  expreal(x: number): number {
    // La raíz n-ésima de x^m es x^(m/n)
    return Math.pow(x, this.numerator / this.denominator);
  }

  // --- LÓGICA DE REDUCCIÓN ---
  
  // Cambiamos void por Rational para que devuelva la instancia
  reduce(): Rational {
    if (this.numerator === 0) {
      this.denominator = 1;
      return this;
    }

    const gcdValue = this.gcd(Math.abs(this.numerator), Math.abs(this.denominator));
    this.numerator /= gcdValue;
    this.denominator /= gcdValue;
    
    // Asegurar que el signo negativo esté solo en el numerador
    if (this.denominator < 0) {
      this.numerator = -this.numerator;
      this.denominator = -this.denominator;
    }

    return this; // <--- ¡Esto es lo que pedían los tests!
  }

  private gcd(a: number, b: number): number {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }
}