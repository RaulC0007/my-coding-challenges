pub struct PascalsTriangle {
    rows: Vec<Vec<u32>>,
}

impl PascalsTriangle {
    pub fn new(row_count: u32) -> Self {
        let mut rows: Vec<Vec<u32>> = Vec::with_capacity(row_count as usize);
        for i in 0..row_count as usize {
            let mut row = vec![1; i + 1];
            for j in 1..i {
                row[j] = rows[i - 1][j - 1] + rows[i - 1][j];
            }
            rows.push(row);
        }
        PascalsTriangle { rows }
    }

    pub fn rows(&self) -> Vec<Vec<u32>> {
        self.rows.clone()
    }
}