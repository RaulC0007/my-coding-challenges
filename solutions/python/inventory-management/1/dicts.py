def create_inventory(items):
    """Create an inventory dictionary from a list of items."""
    inventory = {}
    for item in items:
        inventory[item] = inventory.get(item, 0) + 1
    return inventory

def add_items(inventory, items):
    """Add items from a list to an existing inventory."""
    for item in items:
        inventory[item] = inventory.get(item, 0) + 1
    return inventory

def decrement_items(inventory, items):
    """Decrement items in inventory based on a list, keeping counts >= 0."""
    for item in items:
        if item in inventory and inventory[item] > 0:
            inventory[item] -= 1
    return inventory

def remove_item(inventory, item):
    """Remove an item entirely from the inventory."""
    inventory.pop(item, None)  # None prevents KeyError if item doesn't exist
    return inventory

def list_inventory(inventory):
    """Return a list of (item, quantity) tuples for items with quantity > 0."""
    return [(item, qty) for item, qty in inventory.items() if qty > 0]

    # Test create_inventory
print(create_inventory(["coal", "wood", "wood", "diamond", "diamond", "diamond"]))
# Output: {'coal': 1, 'wood': 2, 'diamond': 3}

# Test add_items
print(add_items({"coal":1}, ["wood", "iron", "coal", "wood"]))
# Output: {'coal': 2, 'wood': 2, 'iron': 1}

# Test decrement_items
print(decrement_items({"coal":3, "diamond":1, "iron":5}, ["diamond", "coal", "iron", "iron"]))
# Output: {'coal': 2, 'diamond': 0, 'iron': 3}

# Test remove_item
print(remove_item({"coal":2, "wood":1, "diamond":2}, "coal"))
# Output: {'wood': 1, 'diamond': 2}

# Test list_inventory
print(list_inventory({"coal":7, "wood":11, "diamond":2, "iron":7, "silver":0}))
# Output: [('coal', 7), ('diamond', 2), ('iron', 7), ('wood', 11)]