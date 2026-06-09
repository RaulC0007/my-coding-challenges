export class ComplexNumber {
  // Usamos modificadores privados para evitar conflictos con los getters
  private readonly _real: number;
  private readonly _imag: number;

  constructor(real: number, imaginary: number) {
    this._real = real;
    this._imag = imaginary;
  }

  // Getters para acceder a las partes del número
  public get real(): number {
    return this._real;
  }

  public get imag(): number {
    return this._imag;
  }

  // Suma: (a + c) + (b + d)i
  public add(other: ComplexNumber): ComplexNumber {
    return new ComplexNumber(this.real + other.real, this.imag + other.imag);
  }

  // Resta: (a - c) + (b - d)i
  public sub(other: ComplexNumber): ComplexNumber {
    return new ComplexNumber(this.real - other.real, this.imag - other.imag);
  }

  // Multiplicación: (a*c - b*d) + (b*c + a*d)i
  public mul(other: ComplexNumber): ComplexNumber {
    const realPart = this.real * other.real - this.imag * other.imag;
    const imagPart = this.imag * other.real + this.real * other.imag;
    return new ComplexNumber(realPart, imagPart);
  }

  // División: requiere usar el cuadrado del denominador (c^2 + d^2)
  public div(other: ComplexNumber): ComplexNumber {
    const denominator = other.real * other.real + other.imag * other.imag;
    const realPart = (this.real * other.real + this.imag * other.imag) / denominator;
    const imagPart = (this.imag * other.real - this.real * other.imag) / denominator;
    return new ComplexNumber(realPart, imagPart);
  }

  // Valor absoluto: sqrt(a^2 + b^2)
  public get abs(): number {
    return Math.sqrt(this.real * this.real + this.imag * this.imag);
  }

  // Conjugado: a - bi
  public get conj(): ComplexNumber {
    return new ComplexNumber(this.real, this.imag === 0 ? 0 : -this.imag);
  }

  // Exponencial: e^a * (cos(b) + i * sin(b))
  public get exp(): ComplexNumber {
    const expReal = Math.exp(this.real);
    return new ComplexNumber(
      expReal * Math.cos(this.imag),
      expReal * Math.sin(this.imag)
    );
  }
}