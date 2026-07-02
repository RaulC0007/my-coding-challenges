export class Crypto {
  constructor(text) {
    this.text = text;
  }

  get ciphertext() {
    // Normalize: remove spaces and punctuation, convert to lowercase
    const normalized = this.text.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Return empty string if no characters
    if (normalized.length === 0) {
      return '';
    }
    
    // Calculate rectangle dimensions
    const len = normalized.length;
    let cols = Math.ceil(Math.sqrt(len));
    let rows = Math.ceil(len / cols);
    
    // Adjust dimensions to satisfy: c >= r and c - r <= 1
    while (cols < rows || cols - rows > 1) {
      cols++;
      rows = Math.ceil(len / cols);
    }
    
    // Create the rectangle rows
    const rectangle = [];
    for (let i = 0; i < rows; i++) {
      const start = i * cols;
      const end = start + cols;
      let row = normalized.slice(start, end);
      // Pad the last row with spaces if necessary
      if (row.length < cols) {
        row = row.padEnd(cols, ' ');
      }
      rectangle.push(row);
    }
    
    // Read down the columns
    const columns = [];
    for (let c = 0; c < cols; c++) {
      let column = '';
      for (let r = 0; r < rows; r++) {
        column += rectangle[r][c];
      }
      columns.push(column);
    }
    
    // Join with spaces
    return columns.join(' ');
  }
}
