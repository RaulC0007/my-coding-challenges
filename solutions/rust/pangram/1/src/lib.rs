/// Determine whether a sentence is a pangram.
pub fn is_pangram(sentence: &str) -> bool {
    let mut alphabet_mask = 0u32;
    for c in sentence.chars() {
        if c.is_ascii_alphabetic() {
            let lower = c.to_ascii_lowercase() as u32;
            let bit = lower - 'a' as u32;
            alphabet_mask |= 1 << bit;
        }
    }
    alphabet_mask == 0x3FFFFFF
}