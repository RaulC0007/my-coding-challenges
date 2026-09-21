pub fn square(s: u32) -> u64 {
    // The number of grains on square s is 2^(s-1)
    // Check if the square is valid (1-64)
    if s < 1 || s > 64 {
        panic!("Square must be between 1 and 64");
    }
    2u64.pow(s - 1)
}

pub fn total() -> u64 {
    // The total number of grains on the chessboard is 2^64 - 1
    // This is the sum of all squares: 1 + 2 + 4 + ... + 2^63
    u64::MAX
}