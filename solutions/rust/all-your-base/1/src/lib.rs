#[derive(Debug, PartialEq, Eq)]
pub enum Error {
    InvalidInputBase,
    InvalidOutputBase,
    InvalidDigit(u32),
}

pub fn convert(number: &[u32], from_base: u32, to_base: u32) -> Result<Vec<u32>, Error> {
    // Validate bases
    if from_base < 2 {
        return Err(Error::InvalidInputBase);
    }
    if to_base < 2 {
        return Err(Error::InvalidOutputBase);
    }
    
    // Handle empty input (represents 0)
    if number.is_empty() {
        return Ok(vec![0]);
    }
    
    // Validate digits and remove leading zeros
    let mut digits = Vec::new();
    let mut found_non_zero = false;
    
    for &digit in number {
        if digit >= from_base {
            return Err(Error::InvalidDigit(digit));
        }
        if digit != 0 || found_non_zero {
            digits.push(digit);
            found_non_zero = true;
        }
    }
    
    // If all digits were zero, the number is 0
    if digits.is_empty() {
        return Ok(vec![0]);
    }
    
    // Convert from the input base to decimal (using u128 to avoid overflow)
    let mut decimal_value: u128 = 0;
    for &digit in &digits {
        decimal_value = decimal_value * (from_base as u128) + (digit as u128);
    }
    
    // Handle the case where the value is 0
    if decimal_value == 0 {
        return Ok(vec![0]);
    }
    
    // Convert from decimal to the output base
    let mut result = Vec::new();
    let mut value = decimal_value;
    let to_base_u128 = to_base as u128;
    
    while value > 0 {
        let remainder = (value % to_base_u128) as u32;
        result.push(remainder);
        value /= to_base_u128;
    }
    
    // The digits are in reverse order, so reverse them
    result.reverse();
    
    Ok(result)
}