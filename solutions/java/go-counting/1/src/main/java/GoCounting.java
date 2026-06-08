import java.awt.Point;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.Map;
import java.util.Queue;
import java.util.Set;

class GoCounting {
    private final String[] rows;
    private final int width;
    private final int height;

    GoCounting(String board) {
        if (board == null || board.isEmpty()) {
            this.rows = new String[0];
            this.width = 0;
            this.height = 0;
        } else {
            this.rows = board.split("\n");
            this.height = this.rows.length;
            this.width = this.height > 0 ? this.rows[0].length() : 0;
        }
    }

    private void checkBounds(int x, int y) {
        if (x < 0 || x >= width || y < 0 || y >= height) {
            throw new IllegalArgumentException("Invalid coordinate");
        }
    }

    Player getTerritoryOwner(int x, int y) {
        checkBounds(x, y);
        // A stone is not part of any territory
        if (rows[y].charAt(x) != ' ') {
            return Player.NONE;
        }
        
        Set<Point> territory = getTerritory(x, y);
        boolean touchesBlack = false;
        boolean touchesWhite = false;
        
        // Check all neighbors of all points in the territory
        for (Point p : territory) {
            int[] dx = {0, 0, 1, -1};
            int[] dy = {1, -1, 0, 0};
            for (int i = 0; i < 4; i++) {
                int nx = p.x + dx[i];
                int ny = p.y + dy[i];
                if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                    char neighbor = rows[ny].charAt(nx);
                    if (neighbor == 'B') touchesBlack = true;
                    if (neighbor == 'W') touchesWhite = true;
                }
            }
        }
        
        // Determine owner based on bordering stones
        if (touchesBlack && !touchesWhite) return Player.BLACK;
        if (touchesWhite && !touchesBlack) return Player.WHITE;
        return Player.NONE;
    }

    Set<Point> getTerritory(int x, int y) {
        checkBounds(x, y);
        // A stone is not part of any territory
        if (rows[y].charAt(x) != ' ') {
            return Collections.emptySet();
        }
        
        Set<Point> territory = new HashSet<>();
        Queue<Point> queue = new LinkedList<>();
        queue.add(new Point(x, y));
        territory.add(new Point(x, y));
        
        // BFS to find all connected empty intersections
        while (!queue.isEmpty()) {
            Point p = queue.poll();
            int[] dx = {0, 0, 1, -1};
            int[] dy = {1, -1, 0, 0};
            
            for (int i = 0; i < 4; i++) {
                int nx = p.x + dx[i];
                int ny = p.y + dy[i];
                
                if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                    char neighbor = rows[ny].charAt(nx);
                    if (neighbor == ' ' && !territory.contains(new Point(nx, ny))) {
                        territory.add(new Point(nx, ny));
                        queue.add(new Point(nx, ny));
                    }
                }
            }
        }
        return territory;
    }

    Map<Player, Set<Point>> getTerritories() {
        Map<Player, Set<Point>> territories = new HashMap<>();
        territories.put(Player.BLACK, new HashSet<>());
        territories.put(Player.WHITE, new HashSet<>());
        territories.put(Player.NONE, new HashSet<>());

        boolean[][] visited = new boolean[height][width];

        // Scan the entire board to find all disconnected territories
        for (int r = 0; r < height; r++) {
            for (int c = 0; c < width; c++) {
                if (!visited[r][c] && rows[r].charAt(c) == ' ') {
                    Set<Point> currentTerritory = new HashSet<>();
                    Queue<Point> queue = new LinkedList<>();
                    queue.add(new Point(c, r));
                    visited[r][c] = true;
                    
                    boolean touchesBlack = false;
                    boolean touchesWhite = false;
                    
                    // BFS for the current territory
                    while (!queue.isEmpty()) {
                        Point p = queue.poll();
                        currentTerritory.add(p);
                        
                        int[] dx = {0, 0, 1, -1};
                        int[] dy = {1, -1, 0, 0};
                        
                        for (int i = 0; i < 4; i++) {
                            int nx = p.x + dx[i];
                            int ny = p.y + dy[i];
                            
                            if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                                char neighbor = rows[ny].charAt(nx);
                                if (neighbor == 'B') touchesBlack = true;
                                else if (neighbor == 'W') touchesWhite = true;
                                else if (neighbor == ' ' && !visited[ny][nx]) {
                                    visited[ny][nx] = true;
                                    queue.add(new Point(nx, ny));
                                }
                            }
                        }
                    }
                    
                    // Assign the territory to the correct player
                    Player owner;
                    if (touchesBlack && !touchesWhite) owner = Player.BLACK;
                    else if (touchesWhite && !touchesBlack) owner = Player.WHITE;
                    else owner = Player.NONE;
                    
                    territories.get(owner).addAll(currentTerritory);
                }
            }
        }
        return territories;
    }
}