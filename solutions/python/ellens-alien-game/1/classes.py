class Alien:
    """A class representing an alien in a game"""
    
    total_aliens_created = 0  # Class variable to track created aliens
    
    def __init__(self, x_coordinate, y_coordinate):
        """Initialize an alien with coordinates and health"""
        self.x_coordinate = x_coordinate
        self.y_coordinate = y_coordinate
        self.health = 3
        Alien.total_aliens_created += 1  # Increment counter for each new alien
    
    def hit(self):
        """Decrement the alien's health by 1"""
        self.health -= 1
    
    def is_alive(self):
        """Check if the alien is still alive (health > 0)"""
        return self.health > 0
    
    def teleport(self, new_x, new_y):
        """Move the alien to new coordinates"""
        self.x_coordinate = new_x
        self.y_coordinate = new_y
    
    def collision_detection(self, other_object):
        """Placeholder for future collision detection implementation"""
        pass


def new_aliens_collection(positions):
    """Create a list of Alien objects from a list of coordinate tuples"""
    return [Alien(x, y) for x, y in positions]

# Test alien creation and methods
alien1 = Alien(2, 0)
print(alien1.x_coordinate)  # 2
print(alien1.y_coordinate)  # 0
print(alien1.health)       # 3

# Test hit() and is_alive()
alien1.hit()
print(alien1.health)       # 2
print(alien1.is_alive())   # True

# Test teleport()
alien1.teleport(5, -4)
print(alien1.x_coordinate)  # 5
print(alien1.y_coordinate)  # -4

# Test collision_detection (should do nothing)
alien1.collision_detection("some_object")

# Test alien counter
print(Alien.total_aliens_created)  # 1
alien2 = Alien(0, 0)
print(alien1.total_aliens_created)  # 2
print(alien2.total_aliens_created)  # 2

# Test new_aliens_collection
aliens = new_aliens_collection([(4, 7), (-1, 0)])
for alien in aliens:
    print(alien.x_coordinate, alien.y_coordinate)
# Output:
# 4 7
# -1 0
print(Alien.total_aliens_created)  # 4 (2 from earlier + 2 new ones)
    