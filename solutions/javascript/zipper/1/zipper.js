export class Zipper {
  constructor(focus, crumbs = []) {
    // Usamos el operador spread para clonar el nodo y asegurar inmutabilidad
    this.focus = { ...focus };
    this.crumbs = crumbs;
  }

  static fromTree(tree) {
    return new Zipper(tree);
  }

  toTree() {
    // Si estamos en la raíz (no hay migas de pan), retornamos el foco actual
    if (this.crumbs.length === 0) return this.focus;
    
    // Construimos el árbol desde el foco actual hacia arriba
    let currentFocus = { ...this.focus };
    
    // Recorremos las migas de pan en orden inverso (desde la más reciente a la más antigua)
    for (let i = this.crumbs.length - 1; i >= 0; i--) {
      const crumb = this.crumbs[i];
      
      // Reconstruimos el nodo padre
      const parentNode = {
        value: crumb.value,
        left: crumb.direction === 'left' ? currentFocus : crumb.left,
        right: crumb.direction === 'right' ? currentFocus : crumb.right,
      };
      
      currentFocus = parentNode;
    }
    
    return currentFocus;
  }

  value() {
    return this.focus.value;
  }

  left() {
    if (!this.focus.left) return null;
    
    // Al bajar, guardamos el nodo actual en crumbs y marcamos la dirección
    return new Zipper(this.focus.left, [
      ...this.crumbs,
      { 
        value: this.focus.value, 
        left: this.focus.left, // Guardamos el hijo izquierdo original
        right: this.focus.right, 
        direction: 'left' 
      }
    ]);
  }

  right() {
    if (!this.focus.right) return null;
    
    return new Zipper(this.focus.right, [
      ...this.crumbs,
      { 
        value: this.focus.value, 
        left: this.focus.left, 
        right: this.focus.right, // Guardamos el hijo derecho original
        direction: 'right' 
      }
    ]);
  }

  up() {
    if (this.crumbs.length === 0) return null;
    
    // Recuperamos el padre almacenado en la última miga de pan
    const parent = this.crumbs[this.crumbs.length - 1];
    
    const newFocus = {
      value: parent.value,
      // Reconstruimos el nodo padre uniendo el foco actual con el hermano previo
      left: parent.direction === 'left' ? this.focus : parent.left,
      right: parent.direction === 'right' ? this.focus : parent.right,
    };
    
    return new Zipper(newFocus, this.crumbs.slice(0, -1));
  }

  setValue(val) {
    return new Zipper({ ...this.focus, value: val }, this.crumbs);
  }

  setLeft(node) {
    return new Zipper({ ...this.focus, left: node }, this.crumbs);
  }

  setRight(node) {
    return new Zipper({ ...this.focus, right: node }, this.crumbs);
  }
}