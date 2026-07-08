//
// This is only a SKELETON file for the 'Satellite' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const treeFromTraversals = (preorder, inorder) => {
  // Validaciones
  if (preorder.length !== inorder.length) {
    throw new Error('traversals must have the same length');
  }
  
  if (new Set(preorder).size !== preorder.length || 
      new Set(inorder).size !== inorder.length) {
    throw new Error('traversals must contain unique items');
  }
  
  if (new Set(preorder).size !== new Set(inorder).size ||
      !preorder.every(item => inorder.includes(item))) {
    throw new Error('traversals must have the same elements');
  }
  
  // Función recursiva para construir el árbol
  function build(pre, ino) {
    // Caso base: si no hay elementos, devolver objeto vacío
    if (pre.length === 0) return {};
    
    // El primer elemento del pre-order es la raíz
    const rootValue = pre[0];
    const rootIndex = ino.indexOf(rootValue);
    
    // Dividir el in-order en subárbol izquierdo y derecho
    const leftInorder = ino.slice(0, rootIndex);
    const rightInorder = ino.slice(rootIndex + 1);
    
    // Dividir el pre-order en consecuencia
    // Los siguientes N elementos (tamaño del subárbol izquierdo) son del izquierdo
    const leftPreorder = pre.slice(1, 1 + leftInorder.length);
    const rightPreorder = pre.slice(1 + leftInorder.length);
    
    // Construir recursivamente el nodo actual
    return {
      value: rootValue,
      left: build(leftPreorder, leftInorder),
      right: build(rightPreorder, rightInorder)
    };
  }
  
  return build(preorder, inorder);
};