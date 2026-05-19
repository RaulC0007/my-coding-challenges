export class Series {
  private readonly digits: string;

  constructor(series: string) {
    if (series === '') {
      throw new Error('series cannot be empty');
    }
    this.digits = series;
  }

  public slices(sliceLength: number): number[][] { // Cambiamos el tipo de retorno
    const n = this.digits.length;

    if (sliceLength > n) {
      throw new Error('slice length cannot be greater than series length');
    }
    if (sliceLength === 0) {
      throw new Error('slice length cannot be zero');
    }
    if (sliceLength < 0) {
      throw new Error('slice length cannot be negative');
    }

    const result: number[][] = [];

    for (let i = 0; i <= n - sliceLength; i++) {
      // 1. Tomamos la subcadena: "91"
      const substring = this.digits.substring(i, i + sliceLength);
      
      // 2. La convertimos en arreglo de números: [9, 1]
      const digitArray = substring
        .split('')               // ["9", "1"]
        .map((d) => Number(d));  // [9, 1]
      
      result.push(digitArray);
    }

    return result;
  }
}