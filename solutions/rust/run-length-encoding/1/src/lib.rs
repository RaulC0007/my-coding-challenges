pub fn encode(source: &str) -> String {
    let mut result = String::new();
    let mut chars = source.chars().peekable();

    while let Some(c) = chars.next() {
        let mut count = 1;
        while chars.peek() == Some(&c) {
            chars.next();
            count += 1;
        }
        if count > 1 {
            result.push_str(&count.to_string());
        }
        result.push(c);
    }

    result
}

pub fn decode(source: &str) -> String {
    let mut result = String::new();
    let mut count_str = String::new();

    for c in source.chars() {
        if c.is_ascii_digit() {
            count_str.push(c);
        } else {
            let count = count_str.parse::<usize>().unwrap_or(1);
            for _ in 0..count {
                result.push(c);
            }
            count_str.clear();
        }
    }

    result
}