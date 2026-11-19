const ONES: [&str; 10] = [
    "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
];

const TEENS: [&str; 10] = [
    "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen",
];

const TENS: [&str; 10] = [
    "", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety",
];

const SCALES: [&str; 7] = [
    "", "thousand", "million", "billion", "trillion", "quadrillion", "quintillion",
];

fn encode_chunk(n: u64) -> String {
    if n == 0 {
        return String::new();
    }
    
    let mut result = String::new();
    let hundreds = n / 100;
    let remainder = n % 100;
    
    if hundreds > 0 {
        result.push_str(ONES[hundreds as usize]);
        result.push_str(" hundred");
    }
    
    if remainder > 0 {
        if hundreds > 0 {
            result.push(' '); // Fixed: use push() for single characters
        }
        if remainder < 10 {
            result.push_str(ONES[remainder as usize]);
        } else if remainder < 20 {
            result.push_str(TEENS[(remainder - 10) as usize]);
        } else {
            result.push_str(TENS[(remainder / 10) as usize]);
            if !remainder.is_multiple_of(10) { // Fixed: use is_multiple_of()
                result.push('-'); // Fixed: use push() for single characters
                result.push_str(ONES[(remainder % 10) as usize]);
            }
        }
    }
    
    result
}

pub fn encode(n: u64) -> String {
    if n == 0 {
        return "zero".to_string();
    }
    
    let mut result = Vec::new();
    let mut current = n;
    let mut scale_idx = 0;
    
    // Process the number in chunks of 3 digits
    while current > 0 {
        let chunk = current % 1000;
        if chunk > 0 {
            let mut chunk_str = encode_chunk(chunk);
            if scale_idx > 0 {
                chunk_str.push(' '); // Fixed: use push() for single characters
                chunk_str.push_str(SCALES[scale_idx]);
            }
            result.push(chunk_str);
        }
        current /= 1000;
        scale_idx += 1;
    }
    
    // Reverse so the largest scale comes first, then join with spaces
    result.reverse();
    result.join(" ")
}