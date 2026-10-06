use std::collections::HashMap;

pub fn solve(input: &str) -> Option<HashMap<char, u8>> {
    // Parse the input into left side and right side
    let parts: Vec<&str> = input.split(" == ").collect();
    if parts.len() != 2 {
        return None;
    }
    
    let left_side = parts[0];
    let right_side = parts[1];
    
    // Split left side into individual terms
    let terms: Vec<&str> = left_side.split(" + ").collect();
    
    // Collect all unique letters
    let mut letters = Vec::new();
    for word in terms.iter().chain(std::iter::once(&right_side)) {
        for ch in word.chars() {
            if ch.is_ascii_alphabetic() && !letters.contains(&ch) {
                letters.push(ch);
            }
        }
    }
    
    // Identify leading letters (cannot be zero)
    let mut leading_letters = Vec::new();
    for word in terms.iter().chain(std::iter::once(&right_side)) {
        if let Some(first_char) = word.chars().next() {
            if !leading_letters.contains(&first_char) {
                leading_letters.push(first_char);
            }
        }
    }
    
    // If there are more than 10 unique letters, it's impossible
    if letters.len() > 10 {
        return None;
    }
    
    // Use recursive backtracking to find a solution
    let mut assignments = HashMap::new();
    let mut used_digits = [false; 10];
    
    solve_backtracking(&terms, right_side, &letters, &leading_letters, 0, &mut assignments, &mut used_digits)
}

fn solve_backtracking(
    terms: &[&str],
    right_side: &str,
    letters: &[char],
    leading_letters: &[char],
    index: usize,
    assignments: &mut HashMap<char, u8>,
    used_digits: &mut [bool; 10],
) -> Option<HashMap<char, u8>> {
    // If all letters are assigned, check if the equation is valid
    if index == letters.len() {
        if is_valid(terms, right_side, assignments) {
            return Some(assignments.clone());
        }
        return None;
    }
    
    let letter = letters[index];
    let digit_range: Vec<u8> = if leading_letters.contains(&letter) {
        (1..=9).collect()  // Leading letters cannot be 0
    } else {
        (0..=9).collect()
    };
    
    for &digit in &digit_range {
        if !used_digits[digit as usize] {
            used_digits[digit as usize] = true;
            assignments.insert(letter, digit);
            
            let result = solve_backtracking(
                terms,
                right_side,
                letters,
                leading_letters,
                index + 1,
                assignments,
                used_digits,
            );
            
            if result.is_some() {
                return result;
            }
            
            assignments.remove(&letter);
            used_digits[digit as usize] = false;
        }
    }
    
    None
}

fn word_to_number(word: &str, assignments: &HashMap<char, u8>) -> u64 {
    let mut result = 0;
    for ch in word.chars() {
        if let Some(&digit) = assignments.get(&ch) {
            result = result * 10 + digit as u64;
        } else {
            return 0;
        }
    }
    result
}

fn is_valid(terms: &[&str], right_side: &str, assignments: &HashMap<char, u8>) -> bool {
    // Check if any letter is unassigned
    for word in terms.iter().chain(std::iter::once(&right_side)) {
        for ch in word.chars() {
            if !assignments.contains_key(&ch) {
                return false;
            }
        }
    }
    
    // Calculate the sum of the left side
    let mut sum: u64 = 0;
    for term in terms {
        sum += word_to_number(term, assignments);
    }
    
    // Calculate the right side
    let right_value = word_to_number(right_side, assignments);
    
    sum == right_value
}