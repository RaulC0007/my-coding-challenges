pub fn raindrops(n: u32) -> String {
    let mut result = String::new();
    
    // Check divisibility by 3
    if n.is_multiple_of(3) {
        result.push_str("Pling");
    }
    
    // Check divisibility by 5
    if n.is_multiple_of(5) {
        result.push_str("Plang");
    }
    
    // Check divisibility by 7
    if n.is_multiple_of(7) {
        result.push_str("Plong");
    }
    
    // If no factors matched, return the number as a string
    if result.is_empty() {
        return n.to_string();
    }
    
    result
}