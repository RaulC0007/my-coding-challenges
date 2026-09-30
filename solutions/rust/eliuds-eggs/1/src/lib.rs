pub fn egg_count(display_value: u32) -> usize {
    let mut count = 0;
    let mut n = display_value;
    
    // Count bits by checking the least significant bit repeatedly
    while n > 0 {
        // Check if the least significant bit is 1
        if n & 1 == 1 {
            count += 1;
        }
        // Shift right by 1 to check the next bit
        n >>= 1;
    }
    
    count
}