class WordSearch {
  constructor(grid) {
    this.grid = grid;
    this.rows = grid.length;
    this.cols = grid[0] ? grid[0].length : 0;
  }

  find(words) {
    const result = {};
    
    for (const word of words) {
      const locations = this.findWord(word);
      result[word] = locations;
    }
    
    return result;
  }

  findWord(word) {
    if (!word) return undefined;
    
    // Check every possible starting position
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        // Check all 8 directions
        const directions = [
          [0, 1],   // right
          [1, 0],   // down
          [1, 1],   // down-right
          [1, -1],  // down-left
          [0, -1],  // left
          [-1, 0],  // up
          [-1, 1],  // up-right
          [-1, -1]  // up-left
        ];
        
        for (const [dr, dc] of directions) {
          const end = this.checkDirection(word, row, col, dr, dc);
          if (end) {
            return {
              start: [row + 1, col + 1],  // Convert to 1-based indexing
              end: [end.row + 1, end.col + 1]
            };
          }
        }
      }
    }
    
    return undefined;
  }

  checkDirection(word, startRow, startCol, dr, dc) {
    let row = startRow;
    let col = startCol;
    
    // Check if word fits in this direction
    for (let i = 0; i < word.length; i++) {
      // Check bounds
      if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) {
        return null;
      }
      
      // Check character match
      if (this.grid[row][col] !== word[i]) {
        return null;
      }
      
      // Move to next position in direction
      row += dr;
      col += dc;
    }
    
    // Return the end position (we moved one extra step, so subtract)
    return {
      row: row - dr,
      col: col - dc
    };
  }
}

export default WordSearch;