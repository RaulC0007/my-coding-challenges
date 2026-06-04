export class Crypto {
  private normalizedText: string;
  private rows: number;
  private cols: number;
  private rectangle: string[];

  constructor(plainText: string) {
    // Normalize: remove spaces and punctuation, convert to lowercase
    this.normalizedText = plainText.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Calculate rectangle dimensions
    const len = this.normalizedText.length;
    this.cols = Math.ceil(Math.sqrt(len));
    this.rows = Math.ceil(len / this.cols);
    
    // Adjust columns to ensure c >= r and c - r <= 1
    while (this.cols < this.rows || this.cols - this.rows > 1) {
      this.cols++;
      this.rows = Math.ceil(len / this.cols);
    }
    
    // Create the rectangle by splitting into rows
    this.rectangle = [];
    for (let i = 0; i < this.rows; i++) {
      const start = i * this.cols;
      const end = start + this.cols;
      let row = this.normalizedText.slice(start, end);
      // Pad the last row if necessary
      if (row.length < this.cols) {
        row = row.padEnd(this.cols, ' ');
      }
      this.rectangle.push(row);
    }
  }

  get ciphertext(): string {
    if (this.normalizedText.length === 0) {
      return '';
    }
    
    // Read down the columns
    const columns: string[] = [];
    for (let c = 0; c < this.cols; c++) {
      let column = '';
      for (let r = 0; r < this.rows; r++) {
        column += this.rectangle[r][c];
      }
      columns.push(column);
    }
    
    // Join with spaces
    return columns.join(' ');
  }
}