# 1. Generate seat letters
def generate_seat_letters(number):
    letters = ['A', 'B', 'C', 'D']
    for i in range(number):
        yield letters[i % 4]

# 2. Generate seats
def generate_seats(number):
    row = 1
    seat_gen = generate_seat_letters(number)
    for i in range(number):
        while row == 13:  # Skip row 13
            row += 1
        letter = next(seat_gen)
        yield f"{row}{letter}"
        if letter == 'D':
            row += 1

# 3. Assign seats to passengers
def assign_seats(passengers):
    seat_gen = generate_seats(len(passengers))
    return {passenger: next(seat_gen) for passenger in passengers}

# 4. Generate ticket codes
def generate_codes(seat_numbers, flight_id):
    for seat in seat_numbers:
        code = f"{seat}{flight_id}"
        yield code.ljust(12, '0')

# Example usage
if __name__ == "__main__":
    # Test seat letters
    print("Seat letters:")
    letters = generate_seat_letters(6)
    print([next(letters) for _ in range(6)])  # ['A', 'B', 'C', 'D', 'A', 'B']
    
    # Test seat generation
    print("\nSeats:")
    seats = generate_seats(10)
    print([next(seats) for _ in range(10)])  # ['1A', '1B', '1C', '1D', '2A', '2B', '2C', '2D', '3A', '3B']
    
    # Test seat assignment
    print("\nAssigned seats:")
    passengers = ['Jerimiah', 'Eric', 'Bethany', 'Byte', 'SqueekyBoots', 'Bob']
    print(assign_seats(passengers))  # {'Jerimiah': '1A', 'Eric': '1B', ...}
    
    # Test ticket codes
    print("\nTicket codes:")
    seat_numbers = ['1A', '17D']
    flight_id = 'CO1234'
    ticket_ids = generate_codes(seat_numbers, flight_id)
    print([next(ticket_ids) for _ in range(2)])  # ['1ACO12340000', '17DCO1234000']