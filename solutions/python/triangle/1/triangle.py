def equilateral(sides):
    a, b, c = sides
    return is_triangle(sides) and a == b == c

def isosceles(sides):
    a, b, c = sides
    return is_triangle(sides) and (a == b or b == c or a == c)

def scalene(sides):
    a, b, c = sides
    return is_triangle(sides) and (a != b and b != c and a != c)

def is_triangle(sides):
    a, b, c = sides
    return all([
        a > 0 and b > 0 and c > 0,
        a + b > c,
        b + c > a,
        a + c > b
    ])

print(equilateral([2, 2, 2]))   # True
print(isosceles([3, 3, 5]))     # True
print(scalene([3, 4, 5]))       # True
print(is_triangle([1, 2, 3]))   # False  