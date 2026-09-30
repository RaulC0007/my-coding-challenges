pub fn abbreviate(phrase: &str) -> String {
    // Replace hyphens with spaces (hyphens are word separators)
    let phrase = phrase.replace('-', " ");
    
    let mut acronym = String::new();
    let mut chars = phrase.chars().peekable();
    let mut word_start = true;
    
    while let Some(c) = chars.next() {
        if c.is_whitespace() {
            word_start = true;
            continue;
        }
        
        if !c.is_alphabetic() {
            continue;
        }
        
        if word_start {
            // First letter of a word
            acronym.push(c.to_ascii_uppercase());
            word_start = false;
        } else if c.is_uppercase() {
            // Check if this is a camel case letter (uppercase followed by lowercase)
            if let Some(&next) = chars.peek() {
                if next.is_lowercase() {
                    acronym.push(c.to_ascii_uppercase());
                }
            }
        }
    }
    
    acronym
}
