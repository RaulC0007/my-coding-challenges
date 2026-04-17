export class Matrix {
  private matrix: number[][];

  constructor(matrixString: string) {
    // Split the string into rows by newline
    const rows = matrixString.split('\n');
    
    // Parse each row into an array of numbers
    this.matrix = rows.map(row => 
      row.trim().split(/\s+/).map(Number)
    );
  }

  get rows(): number[][] {
    // Return a copy of the rows to prevent external modification
    return this.matrix.map(row => [...row]);
  }

  get columns(): number[][] {
    const numRows = this.matrix.length;
    const numCols = this.matrix[0]?.length || 0;
    const columns: number[][] = [];
    
    // Build each column by collecting the same index from each row
    for (let col = 0; col < numCols; col++) {
      const column: number[] = [];
      for (let row = 0; row < numRows; row++) {
        column.push(this.matrix[row][col]);
      }
      columns.push(column);
    }
    
    return columns;
  }
}