export class Triangle {
  constructor(side1, side2, side3) {
    this.sides = [side1, side2, side3];
  }

  // Verifica si cumple las condiciones matemáticas básicas para ser un triángulo válido
  get isValid() {
    const [a, b, c] = this.sides;

    // 1. Todos los lados deben tener una longitud mayor a 0
    if (a <= 0 || b <= 0 || c <= 0) {
      return false;
    }

    // 2. Se debe cumplir la desigualdad triangular: la suma de dos lados siempre es >= al tercero
    if (a + b < c || a + c < b || b + c < a) {
      return false;
    }

    return true;
  }

  get isEquilateral() {
    if (!this.isValid) return false;
    const [a, b, c] = this.sides;
    return a === b && b === c;
  }

  get isIsosceles() {
    if (!this.isValid) return false;
    const [a, b, c] = this.sides;
    return a === b || b === c || a === c;
  }

  get isScalene() {
    if (!this.isValid) return false;
    // Es escaleno si es un triángulo válido y todos sus lados son diferentes
    const [a, b, c] = this.sides;
    return a !== b && b !== c && a !== c;
  }
}