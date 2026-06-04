export class GameOfLife {
  private grid: number[][];
  private rows: number;
  private cols: number;

  constructor(matrix: number[][]) {
    // Create a deep copy of the matrix to avoid mutations
    this.grid = matrix.map(row => [...row]);
    this.rows = matrix.length;
    this.cols = this.rows > 0 ? matrix[0].length : 0;
  }

  private countLiveNeighbors(row: number, col: number): number {
    let liveCount = 0;
    
    // Check all 8 neighboring cells
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        // Skip the cell itself
        if (i === 0 && j === 0) continue;
        
        const neighborRow = row + i;
        const neighborCol = col + j;
        
        // Check if neighbor is within bounds
        if (neighborRow >= 0 && neighborRow < this.rows && 
            neighborCol >= 0 && neighborCol < this.cols) {
          if (this.grid[neighborRow][neighborCol] === 1) {
            liveCount++;
          }
        }
      }
    }
    
    return liveCount;
  }

  public tick(): void {
    // Create a new grid for the next generation
    const nextGrid: number[][] = [];
    
    for (let i = 0; i < this.rows; i++) {
      nextGrid.push([]);
      for (let j = 0; j < this.cols; j++) {
        const liveNeighbors = this.countLiveNeighbors(i, j);
        const currentCell = this.grid[i][j];
        
        // Apply Game of Life rules
        if (currentCell === 1) {
          // Live cell: survives with 2 or 3 neighbors
          if (liveNeighbors === 2 || liveNeighbors === 3) {
            nextGrid[i][j] = 1;
          } else {
            nextGrid[i][j] = 0;
          }
        } else {
          // Dead cell: becomes alive with exactly 3 neighbors
          if (liveNeighbors === 3) {
            nextGrid[i][j] = 1;
          } else {
            nextGrid[i][j] = 0;
          }
        }
      }
    }
    
    // Update the grid
    this.grid = nextGrid;
  }

  public state(): number[][] {
    // Return a deep copy to prevent external mutations
    return this.grid.map(row => [...row]);
  }
}