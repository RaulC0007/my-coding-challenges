import java.util.List;
import java.util.HashSet;
import java.util.Set;
import java.util.HashMap;
import java.util.Map;

public class Satellite {
    
    public Tree treeFromTraversals(List<Character> preorderInput, List<Character> inorderInput) {
        // 1. Validación de longitudes
        if (preorderInput.size() != inorderInput.size()) {
            throw new IllegalArgumentException("traversals must have the same length");
        }
        
        // 2. Validación de elementos únicos
        Set<Character> preSet = new HashSet<>(preorderInput);
        Set<Character> inSet = new HashSet<>(inorderInput);
        
        if (preSet.size() != preorderInput.size() || inSet.size() != inorderInput.size()) {
            throw new IllegalArgumentException("traversals must contain unique items");
        }
        
        // 3. Validación de que contienen los mismos elementos
        if (!preSet.equals(inSet)) {
            throw new IllegalArgumentException("traversals must have the same elements");
        }
        
        // Optimización: Mapa para encontrar el índice de cualquier nodo en el recorrido in-order en O(1)
        Map<Character, Integer> inOrderIndex = new HashMap<>();
        for (int i = 0; i < inorderInput.size(); i++) {
            inOrderIndex.put(inorderInput.get(i), i);
        }
        
        // 4. Construcción recursiva del árbol
        Node root = buildTree(preorderInput, 0, preorderInput.size() - 1,
                              inorderInput, 0, inorderInput.size() - 1, 
                              inOrderIndex);
                              
        return new Tree(root);
    }

    private Node buildTree(List<Character> preorder, int preStart, int preEnd,
                           List<Character> inorder, int inStart, int inEnd,
                           Map<Character, Integer> inOrderIndex) {
        
        // Caso base: no hay nodos para procesar en este subárbol
        if (preStart > preEnd) {
            return null;
        }
        
        // El primer elemento del pre-order siempre es la raíz del subárbol actual
        char rootVal = preorder.get(preStart);
        Node root = new Node(rootVal);
        
        // Si solo hay un nodo, es una hoja
        if (preStart == preEnd) {
            return root;
        }
        
        // Encontramos la raíz en el recorrido in-order para dividir los subárboles
        int rootIdx = inOrderIndex.get(rootVal);
        int leftSize = rootIdx - inStart; // Cantidad de nodos en el subárbol izquierdo
        
        // Construir recursivamente el subárbol izquierdo
        root.left = buildTree(preorder, preStart + 1, preStart + leftSize,
                              inorder, inStart, rootIdx - 1, 
                              inOrderIndex);
                              
        // Construir recursivamente el subárbol derecho
        root.right = buildTree(preorder, preStart + leftSize + 1, preEnd,
                               inorder, rootIdx + 1, inEnd, 
                               inOrderIndex);
                               
        return root;
    }
}