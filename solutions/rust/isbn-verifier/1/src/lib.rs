/// Determines whether the supplied string is a valid ISBN number
pub fn is_valid_isbn(isbn: &str) -> bool {
    let mut chars = isbn.chars().filter(|&c| c != '-');
    let mut sum = 0;
    
    for weight in (1..=10).rev() {
        if let Some(c) = chars.next() {
            let val = match c {
                '0'..='9' => c.to_digit(10).unwrap() as i32,
                'X' if weight == 1 => 10,
                _ => return false,
            };
            sum += val * weight;
        } else {
            return false;
        }
    }
    
    // Asegurar que no queden caracteres adicionales
    if chars.next().is_some() {
        return false;
    }

    sum % 11 == 0
}