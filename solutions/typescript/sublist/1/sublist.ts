export class List {
  private elements: unknown[];

  constructor(...elements: unknown[]) {
    // Al usar el operador rest (...), permitimos inicializarlo pasándole elementos sueltos o un arreglo
    this.elements = elements;
  }

  /**
   * Compara la lista actual con otra lista para determinar su relación jerárquica.
   * @param otherList La otra lista con la cual realizar la comparación.
   * @returns 'equal' | 'sublist' | 'superlist' | 'unequal'
   */
  public compare(otherList: List): 'equal' | 'sublist' | 'superlist' | 'unequal' {
    const a = this.elements;
    const b = otherList.elements;

    if (a.length === b.length) {
      return this.isSubsequence(a, b) ? 'equal' : 'unequal';
    }

    if (a.length < b.length) {
      return this.isSubsequence(a, b) ? 'sublist' : 'unequal';
    }

    // Si llegamos aquí, obligatoriamente a.length > b.length
    return this.isSubsequence(b, a) ? 'superlist' : 'unequal';
  }

  /**
   * Función auxiliar que determina si la lista pequeña (small)
   * está contenida de forma contigua dentro de la lista grande (large).
   */
  private isSubsequence(small: unknown[], large: unknown[]): boolean {
    // Caso base: Una lista vacía siempre es sublista de cualquier otra lista
    if (small.length === 0) {
      return true;
    }

    // Buscamos coincidencia barriendo la lista grande con el tamaño de la pequeña
    const maxStartIndex = large.length - small.length;

    for (let i = 0; i <= maxStartIndex; i++) {
      let match = true;
      
      for (let j = 0; j < small.length; j++) {
        if (large[i + j] !== small[j]) {
          match = false;
          break; // Rompemos el bucle interno si un solo elemento difiere
        }
      }

      if (match) {
        return true; // Se encontró la secuencia exacta y contigua
      }
    }

    return false;
  }
}