pub fn find_saddle_points(input: &[Vec<u64>]) -> Vec<(usize, usize)> {
    let mut saddle_points = Vec::new();
    
    // Handle edge cases: empty matrix or matrix with empty rows
    if input.is_empty() || input[0].is_empty() {
        return saddle_points;
    }
    
    let num_cols = input[0].len();
    
    // Precompute the minimum value for each column for O(1) lookups later
    let mut col_mins = vec![u64::MAX; num_cols];
    for row in input {
        for (c, &val) in row.iter().enumerate() {
            if val < col_mins[c] {
                col_mins[c] = val;
            }
        }
    }
    
    // Iterate through each row to find the maximum value and check for saddle points
    for (r, row) in input.iter().enumerate() {
        let row_max = row.iter().max().copied().unwrap();
        
        for (c, &val) in row.iter().enumerate() {
            // A saddle point is the maximum in its row AND the minimum in its column
            if val == row_max && val == col_mins[c] {
                saddle_points.push((r, c));
            }
        }
    }
    
    saddle_points
}