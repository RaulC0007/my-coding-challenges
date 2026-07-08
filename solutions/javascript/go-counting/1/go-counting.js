export class GoCounting {
  constructor(board) {
    this.board = board;
    this.height = board.length;
    this.width = this.height > 0 ? board[0].length : 0;
  }

  getTerritory(x, y) {
    // 1. Validate coordinates
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      return { error: 'Invalid coordinate' };
    }

    // 2. If the starting point is a stone, it has no empty territory
    if (this.board[y][x] !== ' ') {
      return { owner: 'NONE', territory: [] };
    }

    const visited = new Set();
    const territory = [];
    const queue = [[x, y]];
    const boundingStones = new Set();

    visited.add(`${x},${y}`);

    // 3. Breadth-First Search to map the empty territory
    while (queue.length > 0) {
      const [cx, cy] = queue.shift();
      territory.push([cx, cy]);

      // Orthogonal neighbors (left, right, up, down)
      const neighbors = [
        [cx - 1, cy],
        [cx + 1, cy],
        [cx, cy - 1],
        [cx, cy + 1],
      ];

      for (const [nx, ny] of neighbors) {
        // Ensure neighbor is within board boundaries
        if (nx >= 0 && nx < this.width && ny >= 0 && ny < this.height) {
          const char = this.board[ny][nx];
          
          if (char === ' ') {
            const key = `${nx},${ny}`;
            if (!visited.has(key)) {
              visited.add(key);
              queue.push([nx, ny]);
            }
          } else {
            // It's a stone; record its color to determine ownership later
            boundingStones.add(char);
          }
        }
      }
    }

    // 4. Determine ownership based on surrounding stones
    let owner = 'NONE';
    if (boundingStones.has('B') && !boundingStones.has('W')) {
      owner = 'BLACK';
    } else if (boundingStones.has('W') && !boundingStones.has('B')) {
      owner = 'WHITE';
    }

    // Sort coordinates first by X (column), then by Y (row) for predictable testing
    territory.sort((a, b) => (a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]));

    return { owner, territory };
  }

  getTerritories() {
    const result = {
      territoryBlack: [],
      territoryWhite: [],
      territoryNone: [],
    };

    const globalVisited = new Set();

    // Scan the board sequentially to find unmapped territories
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const char = this.board[y][x];
        const key = `${x},${y}`;

        if (char === ' ' && !globalVisited.has(key)) {
          const { owner, territory } = this.getTerritory(x, y);
          
          // Mark all cells in this newly discovered territory as visited globally
          for (const [tx, ty] of territory) {
            globalVisited.add(`${tx},${ty}`);
          }

          // Push the found territory into the correct property
          if (owner === 'BLACK') {
            result.territoryBlack.push(...territory);
          } else if (owner === 'WHITE') {
            result.territoryWhite.push(...territory);
          } else {
            result.territoryNone.push(...territory);
          }
        }
      }
    }

    return result;
  }
}
