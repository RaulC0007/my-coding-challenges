pub fn annotate(garden: &[&str]) -> Vec<String> {
    // If the garden is empty, return an empty vector
    if garden.is_empty() {
        return Vec::new();
    }

    let rows = garden.len();
    let cols = garden[0].len();
    let mut result = Vec::with_capacity(rows);

    // Iterate over each row
    for r in 0..rows {
        let row = garden[r];
        let mut new_row = String::with_capacity(cols);
        let row_bytes = row.as_bytes();

        // Iterate over each column
        for c in 0..cols {
            // If the current cell is a flower, keep it as '*'
            if row_bytes[c] == b'*' {
                new_row.push('*');
                continue;
            }

            // Count adjacent flowers
            let mut count = 0;

            // Check all 8 neighboring cells
            for dr in -1..=1 {
                for dc in -1..=1 {
                    // Skip the current cell (0,0)
                    if dr == 0 && dc == 0 {
                        continue;
                    }

                    let nr = r as i32 + dr;
                    let nc = c as i32 + dc;

                    // Check if the neighbor is within bounds
                    if nr >= 0 && nr < rows as i32 && nc >= 0 && nc < cols as i32 {
                        let neighbor = garden[nr as usize].as_bytes()[nc as usize];
                        if neighbor == b'*' {
                            count += 1;
                        }
                    }
                }
            }

            // If there are adjacent flowers, add the count as a character
            if count > 0 {
                new_row.push((b'0' + count) as char);
            } else {
                // Otherwise, keep it empty
                new_row.push(' ');
            }
        }

        result.push(new_row);
    }

    result
}