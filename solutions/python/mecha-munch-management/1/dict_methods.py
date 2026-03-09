def add_item(current_cart, items_to_add):
    new_cart = current_cart.copy()
    for item in items_to_add:
        new_cart[item] = new_cart.get(item, 0) + 1
    return new_cart


def read_notes(notes):
    cart = {}
    for item in notes:
        cart[item] = 1
    return cart


def update_recipes(ideas, recipe_updates):
    updated_ideas = ideas.copy()
    for recipe_name, new_ingredients in recipe_updates:
        if recipe_name in updated_ideas:
            updated_ideas[recipe_name] = new_ingredients
        else:
            updated_ideas[recipe_name] = new_ingredients
    return updated_ideas


def sort_entries(cart):
    return dict(sorted(cart.items()))


def send_to_store(cart, aisle_mapping):
    fulfillment_cart = {}
    for item, quantity in cart.items():
        aisle_info = aisle_mapping.get(item)
        if aisle_info:
            fulfillment_cart[item] = [quantity] + aisle_info
    return dict(sorted(fulfillment_cart.items(), reverse=True))


def update_store_inventory(fulfillment_cart, store_inventory):
    updated_inventory = store_inventory.copy()
    for item, fulfillment_info in fulfillment_cart.items():
        quantity_ordered = fulfillment_info[0]
        if item in updated_inventory:
            current_quantity = updated_inventory[item][0]
            if current_quantity != 'Out of Stock':
                new_quantity = current_quantity - quantity_ordered
                if new_quantity <= 0:
                    updated_inventory[item][0] = 'Out of Stock'
                else:
                    updated_inventory[item][0] = new_quantity
    return updated_inventory
