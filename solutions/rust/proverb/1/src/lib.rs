pub fn build_proverb(list: &[&str]) -> String {
    if list.is_empty() {
        return String::new();
    }
    
    let mut result = Vec::new();
    
    // Generate the "For want of..." lines
    for i in 0..list.len() - 1 {
        result.push(format!(
            "For want of a {} the {} was lost.",
            list[i], list[i + 1]
        ));
    }
    
    // Add the final line
    result.push(format!("And all for the want of a {}.", list[0]));
    
    result.join("\n")
}