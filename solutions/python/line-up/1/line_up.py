def line_up(name, number):
    """
    Produces a sentence with the customer's name and their position in line
    using the correct ordinal suffix.

    :param name: str - the customer's name.
    :param number: int - the customer's position (1-999).
    :return: str - a formatted sentence with the name and ordinal number.
    """
    
    # Determine the suffix based on the rules for English ordinals
    # Rule: 11, 12, and 13 are exceptions that always use 'th'
    if 11 <= number % 100 <= 13:
        suffix = "th"
    else:
        # Check the last digit
        last_digit = number % 10
        if last_digit == 1:
            suffix = "st"
        elif last_digit == 2:
            suffix = "nd"
        elif last_digit == 3:
            suffix = "rd"
        else:
            suffix = "th"
            
    return f"{name}, you are the {number}{suffix} customer we serve today. Thank you!"