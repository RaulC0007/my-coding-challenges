pub fn find_saddle_points(input: &[Vec<u64>]) -> Vec<(usize, usize)> {
    let mut saddle_points = Vec::new();
    
    // Handle edge cases: empty matrix or matrix with empty rows
    if input.is_empty() || input[0].is_empty() {
        return saddle_points;
    }
    
    let num_rows = input.len();
    let num_cols = input[0].len();
    
    // Precompute the minimum value for each column for O(1) lookups later
    let mut col_mins = vec![u64::MAX; num_cols];
    for c in 0..num_cols {
        for r in 0..num_rows {
            if input[r][c] < col_mins[c] {
                col_mins[c] = input[r][c];
            }
        }
    }
    
    // Iterate through each row to find the maximum value
    for r in 0..num_rows {
        let row_max = input[r].iter().max().copied().unwrap();
        
        // Check each element in the row
        for c in 0..num_cols {
            // A saddle point is the maximum in its row AND the minimum in its column
            if input[r][c] == row_max && input[r][c] == col_mins[c] {
                saddle_points.push((r, c));
            }
        }
    }
    
    saddle_points
}