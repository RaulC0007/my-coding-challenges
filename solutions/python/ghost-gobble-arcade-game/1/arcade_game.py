"""Functions for implementing the rules of the classic arcade game Pac-Man."""


def eat_ghost(power_pellet_active, touching_ghost):
    """Verify that Pac-Man can eat a ghost if he is empowered by a power pellet.

    :param power_pellet_active: bool - does the player have an active power pellet?
    :param touching_ghost: bool - is the player touching a ghost?
    :return: bool - can a ghost be eaten?
    """

    pass


def score(touching_power_pellet, touching_dot):
    """Verify that Pac-Man has scored when a power pellet or dot has been eaten.

    :param touching_power_pellet: bool - is the player touching a power pellet?
    :param touching_dot: bool - is the player touching a dot?
    :return: bool - has the player scored or not?
    """

    pass


def lose(power_pellet_active, touching_ghost):
    """Trigger the game loop to end (GAME OVER) when Pac-Man touches a ghost without his power pellet.

    :param power_pellet_active: bool - does the player have an active power pellet?
    :param touching_ghost: bool - is the player touching a ghost?
    :return: bool - has the player lost the game?
    """

    pass


def win(has_eaten_all_dots, power_pellet_active, touching_ghost):
    """Trigger the victory event when all dots have been eaten.

    :param has_eaten_all_dots: bool - has the player "eaten" all the dots?
    :param power_pellet_active: bool - does the player have an active power pellet?
    :param touching_ghost: bool - is the player touching a ghost?
    :return: bool - has the player won the game?
    """

    pass




    # 1. Define if Pac-Man eats a ghost
def eat_ghost(power_pellet_active, touching_ghost):
    """Determine if Pac-Man can eat a ghost.
    
    :param power_pellet_active: bool - does Pac-Man have an active power pellet?
    :param touching_ghost: bool - is Pac-Man touching a ghost?
    :return: bool - True if Pac-Man can eat the ghost, False otherwise.
    """
    return power_pellet_active and touching_ghost

# 2. Define if Pac-Man scores
def score(touching_power_pellet, touching_dot):
    """Determine if Pac-Man scores points.
    
    :param touching_power_pellet: bool - is Pac-Man touching a power pellet?
    :param touching_dot: bool - is Pac-Man touching a dot?
    :return: bool - True if Pac-Man scores points, False otherwise.
    """
    return touching_power_pellet or touching_dot

# 3. Define if Pac-Man loses
def lose(power_pellet_active, touching_ghost):
    """Determine if Pac-Man loses the game.
    
    :param power_pellet_active: bool - does Pac-Man have an active power pellet?
    :param touching_ghost: bool - is Pac-Man touching a ghost?
    :return: bool - True if Pac-Man loses, False otherwise.
    """
    return touching_ghost and not power_pellet_active

# 4. Define if Pac-Man wins
def win(has_eaten_all_dots, power_pellet_active, touching_ghost):
    """Determine if Pac-Man wins the game.
    
    :param has_eaten_all_dots: bool - has Pac-Man eaten all dots?
    :param power_pellet_active: bool - does Pac-Man have an active power pellet?
    :param touching_ghost: bool - is Pac-Man touching a ghost?
    :return: bool - True if Pac-Man wins, False otherwise.
    """
    return has_eaten_all_dots and not lose(power_pellet_active, touching_ghost)
