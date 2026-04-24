import itertools

def solve(puzzle):
    # Separamos las palabras del puzzle
    parts = puzzle.replace('==', ' ').replace('+', ' ').split()
    left_side = parts[:-1]
    right_side = parts[-1]
    
    words = left_side + [right_side]
    letters = sorted(set("".join(words)))
    
    if len(letters) > 10:
        return None

    # Identificamos las letras que no pueden ser cero (las que inician palabras)
    first_letters = set(w[0] for w in words if len(w) > 1)
    
    # Generamos las permutaciones
    for p in itertools.permutations(range(10), len(letters)):
        d = dict(zip(letters, p))
        
        # Regla: ninguna palabra de más de una letra empieza con cero
        if any(d[l] == 0 for l in first_letters):
            continue
        
        # Calculamos el valor de cada palabra
        def get_value(word):
            val = 0
            for char in word:
                val = val * 10 + d[char]
            return val
        
        if sum(get_value(w) for w in left_side) == get_value(right_side):
            return d
            
    return None
