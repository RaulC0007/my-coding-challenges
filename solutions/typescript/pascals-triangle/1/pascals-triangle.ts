export class Triangle {
  private triangle: number[][] = [];

  constructor(rows: number) {
    if (rows < 0) {
      throw new Error('Number of rows cannot be negative');
    }
    this.triangle = this.calculateRows(rows);
  }

  private calculateRows(rowCount: number): number[][] {
    if (rowCount === 0) return [];
    
    const result: number[][] = [[1]];
    
    for (let i = 1; i < rowCount; i++) {
      const prevRow = result[i - 1];
      const newRow: number[] = [1];
      
      for (let j = 1; j < i; j++) {
        newRow.push(prevRow[j - 1] + prevRow[j]);
      }
      
      newRow.push(1);
      result.push(newRow);
    }
    
    return result;
  }

  public get lastRow(): number[] {
    return this.triangle.length > 0 ? this.triangle[this.triangle.length - 1] : [];
  }

  public get rows(): number[][] {
    return this.triangle;
  }
}