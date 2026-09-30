pub fn series(digits: &str, len: usize) -> Vec<String> {
    if len == 0 {
        return vec![String::new(); digits.chars().count() + 1];
    }
    if len > digits.chars().count() {
        return Vec::new();
    }
    digits
        .chars()
        .collect::<Vec<char>>()
        .windows(len)
        .map(|w| w.iter().collect())
        .collect()
}