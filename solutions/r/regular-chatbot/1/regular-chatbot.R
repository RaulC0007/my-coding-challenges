library(stringr)

is_valid_command <- function(msg) {
  # Check if the message starts with "Chatbot" (case-insensitive)
  # The keyword must be at the beginning of the string
  str_detect(msg, regex("^chatbot", ignore_case = TRUE))
}

remove_emoji <- function(msg) {
  # Remove all occurrences of "emoji" followed by digits
  # Pattern: "emoji" + one or more digits
  str_remove_all(msg, "emoji\\d+")
}

check_phone_number <- function(number) {
  # Check if the number matches the format: (+##) ###-###-###
  # Pattern: \(\+\d{2}\) \d{3}-\d{3}-\d{3}
  if (str_detect(number, "^\\(\\+\\d{2}\\) \\d{3}-\\d{3}-\\d{3}$")) {
    return("Thanks! You can now download me to your phone.")
  } else {
    return(paste0("Oops, it seems like I can't reach out to ", number))
  }
}

nice_to_meet_you <- function(str) {
  # Parse "Last, First" format and return "Nice to meet you, First Last"
  # Pattern: capture last name, comma, space, capture first name
  if (str_detect(str, "^\\w+, \\w+$")) {
    parts <- str_match(str, "^(\\w+), (\\w+)$")
    last_name <- parts[2]
    first_name <- parts[3]
    return(paste0("Nice to meet you, ", first_name, " ", last_name))
  }
  return(str)
}

get_URL <- function(msg) {
  # Extract URL from the message
  # Pattern: match domain-like strings (e.g., exercism.org, www.example.com)
  # Match sequences of alphanumeric characters, dots, and hyphens ending with a TLD
  urls <- str_extract_all(msg, "\\b[a-zA-Z0-9][a-zA-Z0-9.-]*\\.[a-zA-Z]{2,}\\b")[[1]]
  return(urls)
}