#[derive(Debug, PartialEq, Eq)]
pub enum Comparison {
    Equal,
    Sublist,
    Superlist,
    Unequal,
}

pub fn sublist(first_list: &[i32], second_list: &[i32]) -> Comparison {
    // If both lists are empty, they are equal
    if first_list == second_list {
        return Comparison::Equal;
    }

    // Check if first_list is a sublist of second_list
    if is_sublist(first_list, second_list) {
        return Comparison::Sublist;
    }

    // Check if first_list is a superlist of second_list
    if is_sublist(second_list, first_list) {
        return Comparison::Superlist;
    }

    // If none of the above, they are unequal
    Comparison::Unequal
}

// Helper function to check if `list_a` is a contiguous sublist of `list_b`
fn is_sublist(list_a: &[i32], list_b: &[i32]) -> bool {
    // If list_a is empty, it's a sublist of any list
    if list_a.is_empty() {
        return true;
    }

    // If list_a is longer than list_b, it can't be a sublist
    if list_a.len() > list_b.len() {
        return false;
    }

    // Check each possible starting position in list_b
    for start in 0..=(list_b.len() - list_a.len()) {
        if &list_b[start..start + list_a.len()] == list_a {
            return true;
        }
    }

    false
}