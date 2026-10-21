use std::collections::HashMap;

fn is_valid_byte(b: u8) -> bool {
    matches!(b, b'A' | b'C' | b'G' | b'T')
}

pub fn count(nucleotide: char, dna: &str) -> Result<usize, char> {
    if !is_valid_byte(nucleotide as u8) {
        return Err(nucleotide);
    }
    let n_byte = nucleotide as u8;
    let mut cnt = 0;
    for &b in dna.as_bytes() {
        if !is_valid_byte(b) {
            return Err(b as char);
        }
        if b == n_byte {
            cnt += 1;
        }
    }
    Ok(cnt)
}

pub fn nucleotide_counts(dna: &str) -> Result<HashMap<char, usize>, char> {
    let mut counts = HashMap::from([
        ('A', 0),
        ('C', 0),
        ('G', 0),
        ('T', 0),
    ]);

    for &b in dna.as_bytes() {
        if !is_valid_byte(b) {
            return Err(b as char);
        }
        *counts.entry(b as char).or_insert(0) += 1;
    }
    Ok(counts)
}