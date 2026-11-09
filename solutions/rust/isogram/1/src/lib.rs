use std::collections::HashSet;

pub fn check(candidate: &str) -> bool {
    let mut seen = HashSet::new();
    for c in candidate.to_lowercase().chars() {
        if c.is_alphabetic() {
            if !seen.insert(c) {
                return false;
            }
        }
    }
    true
}