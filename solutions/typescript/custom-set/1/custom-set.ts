export class CustomSet {
  private elements: Set<unknown>;

  constructor(initial?: unknown[]) {
    // Si viene un arreglo inicial, lo cargamos en el Set nativo para limpiar duplicados
    this.elements = new Set(initial || []);
  }

  // Comprueba si el conjunto está vacío
  public empty(): boolean {
    return this.elements.size === 0;
  }

  // Verifica si un elemento específico pertenece al conjunto
  public contains(element: unknown): boolean {
    return this.elements.has(element);
  }

  // Agrega un elemento único y retorna la propia instancia del conjunto (Method Chaining)
  public add(element: unknown): CustomSet {
    this.elements.add(element);
    return this;
  }

  // Determina si el conjunto actual es un subconjunto de 'other'
  public subset(other: CustomSet): boolean {
    for (const elem of this.elements) {
      if (!other.contains(elem)) {
        return false;
      }
    }
    return true;
  }

  // Determina si el conjunto actual y 'other' no comparten ningún elemento (son disjuntos)
  public disjoint(other: CustomSet): boolean {
    for (const elem of this.elements) {
      if (other.contains(elem)) {
        return false; // Al primer elemento compartido, ya no son disjuntos
      }
    }
    return true;
  }

  // Comprueba si dos conjuntos contienen exactamente los mismos elementos
  public eql(other: CustomSet): boolean {
    if (this.elements.size !== other.elements.size) {
      return false;
    }
    return this.subset(other);
  }

  // Retorna un nuevo conjunto con la combinación de ambos (A ∪ B)
  public union(other: CustomSet): CustomSet {
    const combined = new CustomSet([...this.elements, ...other.elements]);
    return combined;
  }

  // Retorna un nuevo conjunto con los elementos que tienen en común (A ∩ B)
  public intersection(other: CustomSet): CustomSet {
    const commonElements: unknown[] = [];
    for (const elem of this.elements) {
      if (other.contains(elem)) {
        commonElements.push(elem);
      }
    }
    return new CustomSet(commonElements);
  }

  // Retorna un nuevo conjunto con los elementos de A que no pertenecen a B (A - B)
  public difference(other: CustomSet): CustomSet {
    const uniqueElements: unknown[] = [];
    for (const elem of this.elements) {
      if (!other.contains(elem)) {
        uniqueElements.push(elem);
      }
    }
    return new CustomSet(uniqueElements);
  }
}