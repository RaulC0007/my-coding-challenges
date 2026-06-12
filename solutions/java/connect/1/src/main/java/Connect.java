import java.util.LinkedList;
import java.util.Queue;

class Connect {
    private final char[][] grid;
    private final int rows;

    public Connect(String[] board) {
        if (board == null || board.length == 0) {
            this.rows = 0;
            this.grid = new char[0][0];
            return;
        }
        this.rows = board.length;
        this.grid = new char[rows][];
        // Eliminamos los espacios iniciales y finales para trabajar solo con los caracteres del tablero
        for (int i = 0; i < rows; i++) {
            this.grid[i] = board[i].replaceAll("\\s+", "").toCharArray();
        }
    }

    public Winner computeWinner() {
        if (rows == 0 || grid[0].length == 0) {
            return Winner.NONE;
        }

        // Verificamos si el jugador O ganó (conecta de arriba a abajo)
        if (checkWin('O')) {
            return Winner.PLAYER_O;
        }
        // Verificamos si el jugador X ganó (conecta de izquierda a derecha)
        if (checkWin('X')) {
            return Winner.PLAYER_X;
        }
        
        return Winner.NONE;
    }

    private boolean checkWin(char player) {
        int cols = grid[0].length;
        Queue<int[]> queue = new LinkedList<>();
        boolean[][] visited = new boolean[rows][cols];

        // Inicializamos la búsqueda desde el borde correspondiente a cada jugador
        if (player == 'O') {
            // El jugador O empieza desde la fila superior (fila 0)
            for (int c = 0; c < cols; c++) {
                if (c < grid[0].length && grid[0][c] == 'O') {
                    queue.add(new int[]{0, c});
                    visited[0][c] = true;
                }
            }
        } else {
            // El jugador X empieza desde la columna izquierda (columna 0)
            for (int r = 0; r < rows; r++) {
                if (grid[r].length > 0 && grid[r][0] == 'X') {
                    queue.add(new int[]{r, 0});
                    visited[r][0] = true;
                }
            }
        }

        // Las 6 direcciones posibles en un tablero hexagonal
        // Arriba, Arriba-Derecha, Izquierda, Derecha, Abajo-Izquierda, Abajo
        int[] dr = {-1, -1, 0, 0, 1, 1};
        int[] dc = {0, 1, -1, 1, -1, 0};

        // Búsqueda en Anchura (BFS) para encontrar un camino conectado
        while (!queue.isEmpty()) {
            int[] curr = queue.poll();
            int r = curr[0];
            int c = curr[1];

            // Condición de victoria
            if (player == 'O' && r == rows - 1) {
                return true; // O llegó al borde inferior
            }
            if (player == 'X' && c == grid[r].length - 1) {
                return true; // X llegó al borde derecho
            }

            // Exploramos los 6 vecinos hexagonales
            for (int i = 0; i < 6; i++) {
                int nr = r + dr[i];
                int nc = c + dc[i];

                if (nr >= 0 && nr < rows && nc >= 0 && nc < grid[nr].length && !visited[nr][nc] && grid[nr][nc] == player) {
                    visited[nr][nc] = true;
                    queue.add(new int[]{nr, nc});
                }
            }
        }
        return false;
    }
}