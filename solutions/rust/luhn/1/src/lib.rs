/// Check a Luhn checksum.
pub fn is_valid(code: &str) -> bool {
    // Remove spaces
    let cleaned: String = code.chars().filter(|c| !c.is_whitespace()).collect();
    
    // Check length and that all characters are digits
    if cleaned.len() <= 1 || !cleaned.chars().all(|c| c.is_ascii_digit()) {
        return false;
    }
    
    // Process digits from right to left
    let mut sum = 0;
    let mut count = 0;
    
    for ch in cleaned.chars().rev() {
        let mut digit = ch.to_digit(10).unwrap();
        
        // Double every second digit (starting from the right)
        if count % 2 == 1 {
            digit *= 2;
            if digit > 9 {
                digit -= 9;
            }
        }
        
        sum += digit;
        count += 1;
    }
    
    sum % 10 == 0
}