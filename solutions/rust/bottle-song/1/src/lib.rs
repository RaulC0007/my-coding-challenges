fn number_word(n: u32) -> &'static str {
    match n {
        0 => "no",
        1 => "one",
        2 => "two",
        3 => "three",
        4 => "four",
        5 => "five",
        6 => "six",
        7 => "seven",
        8 => "eight",
        9 => "nine",
        10 => "ten",
        _ => unreachable!("bottle count out of range"),
    }
}

fn capitalize(word: &str) -> String {
    let mut chars = word.chars();
    match chars.next() {
        Some(first) => first.to_uppercase().collect::<String>() + chars.as_str(),
        None => String::new(),
    }
}

fn bottle_word(n: u32) -> &'static str {
    if n == 1 { "bottle" } else { "bottles" }
}

fn verse(n: u32) -> Vec<String> {
    let capitalized = capitalize(number_word(n));
    vec![
        format!("{} green {} hanging on the wall,", capitalized, bottle_word(n)),
        format!("{} green {} hanging on the wall,", capitalized, bottle_word(n)),
        "And if one green bottle should accidentally fall,".to_string(),
        format!(
            "There'll be {} green {} hanging on the wall.",
            number_word(n - 1),
            bottle_word(n - 1)
        ),
    ]
}

pub fn recite(start_bottles: u32, take_down: u32) -> String {
    let mut lines: Vec<String> = Vec::new();

    for i in 0..take_down {
        if i > 0 {
            lines.push(String::new());
        }
        lines.extend(verse(start_bottles - i));
    }

    lines.join("\n")
}