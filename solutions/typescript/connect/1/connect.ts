type Coordinate = [number, number];

export class Board {
  private grid: string[][];
  private rows: number;
  private cols: number;

  constructor(board: string[]) {
    // 1. Filtramos líneas vacías y procesamos limpiamente eliminando espacios intermedios
    this.grid = board
      .map(line => line.trim().split(/\s+/).filter(char => char !== ''))
      .filter(row => row.length > 0);

    this.rows = this.grid.length;
    this.cols = this.rows > 0 ? this.grid[0].length : 0;
  }

  public winner(): string {
    if (this.rows === 0 || this.cols === 0) return '';
    
    if (this.checkWin('X')) return 'X';
    if (this.checkWin('O')) return 'O';
    
    return '';
  }

  private checkWin(player: 'X' | 'O'): boolean {
    const queue: Coordinate[] = [];
    const visited = Array.from({ length: this.rows }, () => Array(this.cols).fill(false));

    if (player === 'X') {
      for (let r = 0; r < this.rows; r++) {
        if (this.grid[r][0] === 'X') {
          queue.push([r, 0]);
          visited[r][0] = true;
        }
      }
    } else {
      for (let c = 0; c < this.cols; c++) {
        if (this.grid[0][c] === 'O') {
          queue.push([0, c]);
          visited[0][c] = true;
        }
      }
    }

    while (queue.length > 0) {
      const [r, c] = queue.shift()!;

      if (player === 'X' && c === this.cols - 1) return true;
      if (player === 'O' && r === this.rows - 1) return true;

      const neighbors = this.getNeighbors(r, c);
      for (const [nr, nc] of neighbors) {
        if (!visited[nr][nc] && this.grid[nr][nc] === player) {
          visited[nr][nc] = true;
          queue.push([nr, nc]);
        }
      }
    }

    return false;
  }

  private getNeighbors(r: number, c: number): Coordinate[] {
    const potentialNeighbors: Coordinate[] = [
      [r - 1, c],
      [r - 1, c + 1],
      [r, c - 1],
      [r, c + 1],
      [r + 1, c - 1],
      [r + 1, c]
    ];

    return potentialNeighbors.filter(
      ([nr, nc]) => nr >= 0 && nr < this.rows && nc >= 0 && nc < this.cols
    );
  }
}