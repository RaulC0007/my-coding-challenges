// For the bonus grapheme feature
#[cfg(feature = "grapheme")]
use unicode_segmentation::UnicodeSegmentation;

pub fn reverse(input: &str) -> String {
    // Basic implementation: reverse by characters (works for ASCII and many Unicode strings)
    input.chars().rev().collect()
}

// Bonus implementation using grapheme clusters (for proper handling of combining characters)
#[cfg(feature = "grapheme")]
pub fn reverse_grapheme(input: &str) -> String {
    input.graphemes(true).rev().collect()
}