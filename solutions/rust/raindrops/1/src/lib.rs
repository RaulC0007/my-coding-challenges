pub fn raindrops(n: u32) -> String {
    let mut result = String::new();
    
    // Check divisibility by 3
    if n % 3 == 0 {
        result.push_str("Pling");
    }
    
    // Check divisibility by 5
    if n % 5 == 0 {
        result.push_str("Plang");
    }
    
    // Check divisibility by 7
    if n % 7 == 0 {
        result.push_str("Plong");
    }
    
    // If no factors matched, return the number as a string
    if result.is_empty() {
        return n.to_string();
    }
    
    result
}