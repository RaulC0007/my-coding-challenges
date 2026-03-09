def square(number):
    """Calculate grains on a given chessboard square (1-64)."""
    if not 1 <= number <= 64:
        raise ValueError("square must be between 1 and 64")
    return 2 ** (number - 1)

def total():
    """Calculate total grains on all 64 chessboard squares."""
    return 2 ** 64 - 1

print(square(1))   # 1
print(square(2))   # 2
print(square(3))   # 4
print(square(64))  # 9223372036854775808
print(total())     # 18446744073709551615