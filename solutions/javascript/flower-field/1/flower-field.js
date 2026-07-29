export const annotate = (input) => {
  if (input.length === 0) {
    return [];
  }
  
  const rows = input.length;
  const cols = input[0].length;
  
  // Convert to 2D array for easier manipulation
  const board = input.map(row => row.split(''));
  
  // Directions: all 8 adjacent cells (horizontal, vertical, diagonal)
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1]
  ];
  
  // Create result board
  const result = board.map(row => [...row]);
  
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // Only process empty squares (not flowers)
      if (board[i][j] === ' ') {
        let flowerCount = 0;
        
        // Check all adjacent cells
        for (const [dx, dy] of directions) {
          const newRow = i + dx;
          const newCol = j + dy;
          
          // Check if adjacent cell is within bounds
          if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
            if (board[newRow][newCol] === '*') {
              flowerCount++;
            }
          }
        }
        
        // Update result if there are adjacent flowers
        if (flowerCount > 0) {
          result[i][j] = flowerCount.toString();
        }
        // Otherwise leave as space (already ' ')
      }
    }
  }
  
  return result.map(row => row.join(''));
};