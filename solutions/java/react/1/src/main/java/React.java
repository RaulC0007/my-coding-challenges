import java.util.*;
import java.util.function.Consumer;
import java.util.function.Function;

public class React {

    public static class Cell<T> {
        protected T value;
        protected Set<ComputeCell<T>> dependents = new HashSet<>();

        public T getValue() {
            return value;
        }
        
        void addDependent(ComputeCell<T> dependent) {
            dependents.add(dependent);
        }
    }

    public static class InputCell<T> extends Cell<T> {
        public InputCell(T initialValue) {
            this.value = initialValue;
        }

        public void setValue(T newValue) {
            // Solo propagamos si el valor ha cambiado realmente
            if (!Objects.equals(this.value, newValue)) {
                this.value = newValue;
                
                // 1. Recopilar todas las celdas de cálculo alcanzables (BFS)
                Set<ComputeCell<T>> reachable = new LinkedHashSet<>();
                Queue<Cell<T>> queue = new LinkedList<>();
                queue.add(this);
                Set<Cell<T>> visited = new HashSet<>();
                visited.add(this);
                
                while (!queue.isEmpty()) {
                    Cell<T> current = queue.poll();
                    for (ComputeCell<T> dep : current.dependents) {
                        if (!visited.contains(dep)) {
                            visited.add(dep);
                            reachable.add(dep);
                            queue.add(dep);
                        }
                    }
                }
                
                // 2. Orden topológico para asegurar que las dependencias se calculan antes
                List<ComputeCell<T>> sorted = new ArrayList<>();
                Set<ComputeCell<T>> processed = new HashSet<>();
                
                while (sorted.size() < reachable.size()) {
                    boolean progress = false;
                    for (ComputeCell<T> cell : reachable) {
                        if (!processed.contains(cell)) {
                            boolean allDepsProcessed = true;
                            for (Cell<T> dep : cell.dependencies) {
                                if (reachable.contains(dep) && !processed.contains(dep)) {
                                    allDepsProcessed = false;
                                    break;
                                }
                            }
                            if (allDepsProcessed) {
                                sorted.add(cell);
                                processed.add(cell);
                                progress = true;
                            }
                        }
                    }
                    if (!progress) break; // Seguridad contra bucles (no debería pasar en un DAG)
                }
                
                // 3. Recalcular valores y recopilar celdas que cambiaron
                List<ComputeCell<T>> changed = new ArrayList<>();
                for (ComputeCell<T> cell : sorted) {
                    if (cell.recompute()) {
                        changed.add(cell);
                    }
                }
                
                // 4. Disparar callbacks solo para las celdas cuyo valor cambió en el estado estable
                for (ComputeCell<T> cell : changed) {
                    cell.fireCallbacks();
                }
            }
        }
    }

    public static class ComputeCell<T> extends Cell<T> {
        final Function<List<T>, T> function;
        final List<Cell<T>> dependencies;
        private final Set<Consumer<T>> callbacks = new LinkedHashSet<>();

        public ComputeCell(Function<List<T>, T> function, List<Cell<T>> dependencies) {
            this.function = function;
            this.dependencies = dependencies;
            for (Cell<T> dep : dependencies) {
                dep.addDependent(this);
            }
            recompute(); // Inicializar el valor
        }

        boolean recompute() {
            List<T> values = new ArrayList<>();
            for (Cell<T> dep : dependencies) {
                values.add(dep.getValue());
            }
            T newValue = function.apply(values);
            if (!Objects.equals(this.value, newValue)) {
                this.value = newValue;
                return true;
            }
            return false;
        }

        void fireCallbacks() {
            // Usamos una copia de la lista para evitar ConcurrentModificationException
            for (Consumer<T> callback : new ArrayList<>(callbacks)) {
                callback.accept(this.value);
            }
        }

        public void addCallback(Consumer<T> callback) {
            callbacks.add(callback);
        }

        public void removeCallback(Consumer<T> callback) {
            callbacks.remove(callback);
        }
    }

    public static <T> InputCell<T> inputCell(T initialValue) {
        return new InputCell<>(initialValue);
    }

    public static <T> ComputeCell<T> computeCell(Function<List<T>, T> function, List<Cell<T>> cells) {
        return new ComputeCell<>(function, cells);
    }
}
