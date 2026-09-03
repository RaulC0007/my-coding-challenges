pub fn reply(message: &str) -> &str {
    let trimmed = message.trim();

    let is_empty = trimmed.is_empty();
    let has_letters = trimmed.chars().any(|c| c.is_alphabetic());
    let is_yelling = has_letters && trimmed.chars().all(|c| !c.is_alphabetic() || c.is_uppercase());
    let is_question = trimmed.ends_with('?');

    if is_empty {
        "Fine. Be that way!"
    } else if is_yelling && is_question {
        "Calm down, I know what I'm doing!"
    } else if is_yelling {
        "Whoa, chill out!"
    } else if is_question {
        "Sure."
    } else {
        "Whatever."
    }
}