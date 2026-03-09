def clean_ingredients(dish_name, dish_ingredients):
    return (dish_name, set(dish_ingredients))
from sets_categories_data import ALCOHOLS

def check_drinks(drink_name, drink_ingredients):
    if set(drink_ingredients) & ALCOHOLS:
        return f"{drink_name} Cocktail"
    return f"{drink_name} Mocktail"    

from sets_categories_data import VEGAN, VEGETARIAN, PALEO, KETO, OMNIVORE

def categorize_dish(dish_name, dish_ingredients):
    ingredients = set(dish_ingredients)
    if ingredients <= VEGAN:
        return f"{dish_name}: VEGAN"
    elif ingredients <= VEGETARIAN:
        return f"{dish_name}: VEGETARIAN"
    elif ingredients <= PALEO:
        return f"{dish_name}: PALEO"
    elif ingredients <= KETO:
        return f"{dish_name}: KETO"
    else:
        return f"{dish_name}: OMNIVORE"

from sets_categories_data import SPECIAL_INGREDIENTS

def tag_special_ingredients(dish):
    name, ingredients = dish
    return (name, set(ingredients) & SPECIAL_INGREDIENTS)

def compile_ingredients(dishes):
    master_set = set()
    for dish in dishes:
        master_set.update(dish)
    return master_set

def separate_appetizers(dishes, appetizers):
    # Convert both lists to sets to remove duplicates
    dishes_set = set(dishes)
    appetizers_set = set(appetizers)
    
    # Remove appetizers from dishes
    remaining_dishes = dishes_set - appetizers_set
    
    # Return as a list
    return list(remaining_dishes)

def singleton_ingredients(dishes, intersections):
    # Combine all ingredients from all dishes
    all_ingredients = set().union(*dishes)
    
    # Subtract the ingredients that appear in multiple dishes
    singletons = all_ingredients - intersections
    
    return singletons    