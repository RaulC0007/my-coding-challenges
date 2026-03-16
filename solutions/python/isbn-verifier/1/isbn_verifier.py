def is_valid(isbn):
    # Remove hyphens
    cleaned_isbn = isbn.replace('-', '')
    
    # Check length is 10
    if len(cleaned_isbn) != 10:
        return False
    
    # Check first 9 characters are digits and last is digit or X
    for i in range(9):
        if not cleaned_isbn[i].isdigit():
            return False
    last_char = cleaned_isbn[9]
    if not (last_char.isdigit() or last_char.upper() == 'X'):
        return False
    
    # Calculate the checksum
    total = 0
    for i in range(10):
        if i < 9:
            total += int(cleaned_isbn[i]) * (10 - i)
        else:
            if cleaned_isbn[i].upper() == 'X':
                total += 10 * (10 - i)
            else:
                total += int(cleaned_isbn[i]) * (10 - i)
    
    return total % 11 == 0