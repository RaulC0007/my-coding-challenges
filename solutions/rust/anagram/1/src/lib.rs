use std::collections::HashSet;

pub fn anagrams_for<'a>(word: &str, possible_anagrams: &[&'a str]) -> HashSet<&'a str> {
    // Helper function to normalize a word for comparison
    fn normalize(s: &str) -> String {
        let mut chars: Vec<char> = s.to_lowercase().chars().collect();
        chars.sort_unstable();
        chars.into_iter().collect()
    }

    let target_lower = word.to_lowercase();
    let target_sorted = normalize(word);
    let mut result = HashSet::new();

    for &candidate in possible_anagrams {
        // Skip if it's the same word (case-insensitive)
        if candidate.to_lowercase() == target_lower {
            continue;
        }

        // Check if it's an anagram by comparing sorted lowercase characters
        if normalize(candidate) == target_sorted {
            result.insert(candidate);
        }
    }

    result
}