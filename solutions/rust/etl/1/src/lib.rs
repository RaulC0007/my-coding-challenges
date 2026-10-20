use std::collections::BTreeMap;

pub fn transform(h: &BTreeMap<i32, Vec<char>>) -> BTreeMap<char, i32> {
    let mut result = BTreeMap::new();

    for (&score, letters) in h {
        for letter in letters {
            for lowercase_letter in letter.to_lowercase() {
                result.insert(lowercase_letter, score);
            }
        }
    }

    result
}