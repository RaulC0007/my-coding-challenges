pub fn translate(input: &str) -> String {
    input
        .split_whitespace()
        .map(translate_word)
        .collect::<Vec<_>>()
        .join(" ")
}

fn translate_word(word: &str) -> String {
    let bytes = word.as_bytes();
    // Rule 1: begins with vowel, "xr", or "yt"
    if word.starts_with("xr") 
        || word.starts_with("yt") 
        || matches!(bytes.first(), Some(b'a' | b'e' | b'i' | b'o' | b'u')) 
    {
        return format!("{word}ay");
    }

    let chars: Vec<char> = word.chars().collect();
    let n = chars.len();

    // Check for leading consonants followed by "qu" (Rule 3)
    let mut qu_split = None;
    for i in 0..n - 1 {
        if chars[i] == 'q' && chars[i + 1] == 'u' {
            let prefix = &word[..i];
            if prefix.chars().all(|c| !matches!(c, 'a' | 'e' | 'i' | 'o' | 'u' | 'y')) {
                qu_split = Some(i + 2);
                break;
            }
        }
    }

    if let Some(idx) = qu_split {
        let (prefix, rest) = word.split_at(idx);
        return format!("{rest}{prefix}ay");
    }

    // Find the first vowel sound (Rule 2 and Rule 4)
    let mut split_idx = n;
    for (i, &c) in chars.iter().enumerate() {
        if matches!(c, 'a' | 'e' | 'i' | 'o' | 'u') {
            split_idx = i;
            break;
        }
        if c == 'y' && i > 0 {
            let has_prior_vowel = word[..i].chars().any(|x| matches!(x, 'a' | 'e' | 'i' | 'o' | 'u'));
            if !has_prior_vowel {
                split_idx = i;
                break;
            }
        }
    }

    let (prefix, rest) = word.split_at(split_idx);
    format!("{rest}{prefix}ay")
}