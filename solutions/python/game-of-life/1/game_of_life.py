def tick(matrix):
    """
    Calculate the next generation of Conway's Game of Life.
    
    :param matrix: list[list[int]] - A 2D grid where 1 is alive and 0 is dead.
    :return: list[list[int]] - The grid representing the next generation.
    """
    if not matrix or not matrix[0]:
        return matrix

    rows = len(matrix)
    cols = len(matrix[0])
    
    # Create a deep copy of the matrix to store the new state
    # We must not modify the original matrix while calculating neighbors
    next_gen = [[0 for _ in range(cols)] for _ in range(rows)]

    for r in range(rows):
        for c in range(cols):
            # Count live neighbors in the 8 surrounding cells
            live_neighbors = 0
            
            # Iterate through the 3x3 area centered on the current cell
            for i in range(r - 1, r + 2):
                for j in range(c - 1, c + 2):
                    # Skip the cell itself
                    if i == r and j == c:
                        continue
                    
                    # Check if the neighbor is within the grid boundaries
                    if 0 <= i < rows and 0 <= j < cols:
                        if matrix[i][j] == 1:
                            live_neighbors += 1
            
            # Apply Conway's Rules:
            if matrix[r][c] == 1:
                # Rule 1 & 2: A live cell stays alive with 2 or 3 neighbors
                if live_neighbors == 2 or live_neighbors == 3:
                    next_gen[r][c] = 1
                # Rule 3: All other live cells die (overpopulation or isolation)
                else:
                    next_gen[r][c] = 0
            else:
                # Rule 4: A dead cell becomes alive with exactly 3 neighbors
                if live_neighbors == 3:
                    next_gen[r][c] = 1
                    
    return next_gen