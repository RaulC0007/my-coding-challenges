import java.util.*;

public class MazeGenerator {
    private static final char WALL = '│';
    private static final char HORIZONTAL_WALL = '─';
    private static final char TOP_LEFT = '┌';
    private static final char TOP_RIGHT = '┐';
    private static final char BOTTOM_LEFT = '└';
    private static final char BOTTOM_RIGHT = '┘';
    private static final char T_LEFT = '┤';
    private static final char T_RIGHT = '├';
    private static final char T_TOP = '┴';
    private static final char T_BOTTOM = '┬';
    private static final char CROSS = '┼';
    private static final char SPACE = ' ';
    private static final char ENTRANCE = '⇨';
    
    public char[][] generatePerfectMaze(int rows, int columns) {
        return generatePerfectMaze(rows, columns, new Random().nextInt());
    }
    
    public char[][] generatePerfectMaze(int rows, int columns, int seed) {
        // 🔧 FIX: Add proper input validation
        if (rows < 5 || rows > 100 || columns < 5 || columns > 100) {
            throw new IllegalArgumentException("Maze dimensions must be between 5 and 100");
        }
        
        Random random = new Random(seed);
        
        // Create grid representation (rooms are at even coordinates)
        int height = 2 * rows + 1;
        int width = 2 * columns + 1;
        char[][] maze = new char[height][width];
        
        // Initialize with walls
        for (int i = 0; i < height; i++) {
            for (int j = 0; j < width; j++) {
                maze[i][j] = WALL;
            }
        }
        
        // Carve out rooms and passages using DFS
        boolean[][] visited = new boolean[rows][columns];
        Stack<Cell> stack = new Stack<>();
        
        // Start from top-left room (0, 0)
        Cell start = new Cell(0, 0);
        stack.push(start);
        visited[0][0] = true;
        
        while (!stack.isEmpty()) {
            Cell current = stack.peek();
            List<Cell> neighbors = getUnvisitedNeighbors(current, visited, rows, columns);
            
            if (neighbors.isEmpty()) {
                stack.pop();
            } else {
                Cell next = neighbors.get(random.nextInt(neighbors.size()));
                removeWall(maze, current, next);
                visited[next.row][next.col] = true;
                stack.push(next);
            }
        }
        
        // Carve out the actual rooms (make them spaces)
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < columns; j++) {
                maze[2 * i + 1][2 * j + 1] = SPACE;
            }
        }
        
        // Set entrance and exit
        maze[2 * rows - 1][0] = ENTRANCE; // Left side, bottom row
        maze[1][width - 1] = ENTRANCE;    // Right side, top row
        
        // Fix corner and junction characters
        fixJunctions(maze, rows, columns);
        
        return maze;
    }
    
    private void removeWall(char[][] maze, Cell from, Cell to) {
        int fromRow = 2 * from.row + 1;
        int fromCol = 2 * from.col + 1;
        int toRow = 2 * to.row + 1;
        int toCol = 2 * to.col + 1;
        
        int wallRow = (fromRow + toRow) / 2;
        int wallCol = (fromCol + toCol) / 2;
        
        maze[wallRow][wallCol] = SPACE;
    }
    
    private List<Cell> getUnvisitedNeighbors(Cell cell, boolean[][] visited, int rows, int cols) {
        List<Cell> neighbors = new ArrayList<>();
        int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
        
        for (int[] dir : directions) {
            int newRow = cell.row + dir[0];
            int newCol = cell.col + dir[1];
            
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && !visited[newRow][newCol]) {
                neighbors.add(new Cell(newRow, newCol));
            }
        }
        
        return neighbors;
    }
    
    private void fixJunctions(char[][] maze, int rows, int columns) {
        int height = 2 * rows + 1;
        int width = 2 * columns + 1;
        
        for (int i = 0; i < height; i++) {
            for (int j = 0; j < width; j++) {
                if (maze[i][j] == WALL) {
                    boolean top = (i > 0 && maze[i-1][j] != WALL);
                    boolean bottom = (i < height-1 && maze[i+1][j] != WALL);
                    boolean left = (j > 0 && maze[i][j-1] != WALL);
                    boolean right = (j < width-1 && maze[i][j+1] != WALL);
                    
                    // Count how many directions are open
                    int openCount = (top ? 1 : 0) + (bottom ? 1 : 0) + (left ? 1 : 0) + (right ? 1 : 0);
                    
                    if (openCount == 0) {
                        // This should be a solid wall, but check corners
                        if (i == 0 && j == 0) maze[i][j] = TOP_LEFT;
                        else if (i == 0 && j == width-1) maze[i][j] = TOP_RIGHT;
                        else if (i == height-1 && j == 0) maze[i][j] = BOTTOM_LEFT;
                        else if (i == height-1 && j == width-1) maze[i][j] = BOTTOM_RIGHT;
                        else if (i == 0) maze[i][j] = HORIZONTAL_WALL;
                        else if (i == height-1) maze[i][j] = HORIZONTAL_WALL;
                        else if (j == 0 || j == width-1) maze[i][j] = WALL;
                        else maze[i][j] = WALL;
                    } else if (openCount == 1) {
                        // End cap
                        if (top) maze[i][j] = WALL;
                        else if (bottom) maze[i][j] = WALL;
                        else if (left) maze[i][j] = HORIZONTAL_WALL;
                        else if (right) maze[i][j] = HORIZONTAL_WALL;
                    } else if (openCount == 2) {
                        // Straight or corner
                        if (top && bottom) maze[i][j] = WALL;
                        else if (left && right) maze[i][j] = HORIZONTAL_WALL;
                        else if (top && left) maze[i][j] = T_RIGHT;
                        else if (top && right) maze[i][j] = T_LEFT;
                        else if (bottom && left) maze[i][j] = T_RIGHT;
                        else if (bottom && right) maze[i][j] = T_LEFT;
                    } else if (openCount == 3) {
                        if (!top) maze[i][j] = T_TOP;
                        else if (!bottom) maze[i][j] = T_BOTTOM;
                        else if (!left) maze[i][j] = T_LEFT;
                        else if (!right) maze[i][j] = T_RIGHT;
                    } else if (openCount == 4) {
                        maze[i][j] = CROSS;
                    }
                }
            }
        }
    }
    
    private static class Cell {
        int row, col;
        Cell(int row, int col) {
            this.row = row;
            this.col = col;
        }
    }
}
