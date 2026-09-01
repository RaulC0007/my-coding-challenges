pub fn is_armstrong_number(num: u32) -> bool {
    // Handle the special case of 0
    if num == 0 {
        return true;
    }

    // Get the number of digits
    let num_str = num.to_string();
    let num_digits = num_str.len() as u32;

    // Calculate the sum of each digit raised to the power of num_digits
    let sum: u32 = num_str
        .chars()
        .map(|c| c.to_digit(10).unwrap())
        .map(|digit| digit.pow(num_digits))
        .sum();

    // Check if the sum equals the original number
    sum == num
}