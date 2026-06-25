export class BinarySearchTree<T = number> {
  private _data: T;
  private _left?: BinarySearchTree<T>;
  private _right?: BinarySearchTree<T>;

  constructor(data: T) {
    this._data = data;
  }

  // Getters requeridos por la especificación de las pruebas
  public get data(): T {
    return this._data;
  }

  public get left(): BinarySearchTree<T> | undefined {
    return this._left;
  }

  public get right(): BinarySearchTree<T> | undefined {
    return this._right;
  }

  /**
   * Inserta un nuevo elemento en el lugar correcto del árbol.
   */
  public insert(item: T): void {
    if (item <= this._data) {
      // Va a la izquierda (menor o igual)
      if (this._left) {
        this._left.insert(item);
      } else {
        this._left = new BinarySearchTree(item);
      }
    } else {
      // Va a la derecha (mayor)
      if (this._right) {
        this._right.insert(item);
      } else {
        this._right = new BinarySearchTree(item);
      }
    }
  }

  /**
   * Recorre el árbol en orden (In-Order) ejecutando un callback por cada nodo.
   * Esto garantiza procesar los datos de manera completamente ordenada.
   */
  public each(callback: (data: T) => void): void {
    // 1. Visitar de forma recursiva el subárbol izquierdo
    if (this._left) {
      this._left.each(callback);
    }

    // 2. Procesar el nodo actual
    callback(this._data);

    // 3. Visitar de forma recursiva el subárbol derecho
    if (this._right) {
      this._right.each(callback);
    }
  }
}