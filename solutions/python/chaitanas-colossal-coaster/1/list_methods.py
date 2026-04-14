def add_me_to_the_queue(express_queue, normal_queue, ticket_type, person_name):
    """
    Add a person to the appropriate queue based on their ticket type.
    
    Args:
        express_queue (list): Fast-track queue
        normal_queue (list): Regular queue
        ticket_type (int): 1 for express, 0 for normal
        person_name (str): Name to add to queue
        
    Returns:
        list: Updated queue
    """
    if ticket_type == 1:
        express_queue.append(person_name)
        return express_queue
    else:
        normal_queue.append(person_name)
        return normal_queue

def find_my_friend(queue, friend_name):
    """
    Find the index position of a friend in the queue.
    
    Args:
        queue (list): Current queue
        friend_name (str): Name to find
        
    Returns:
        int: Index position of friend
    """
    return queue.index(friend_name)

def add_me_with_my_friends(queue, index, person_name):
    """
    Insert a person at a specific position in the queue.
    
    Args:
        queue (list): Current queue
        index (int): Position to insert at
        person_name (str): Name to insert
        
    Returns:
        list: Updated queue
    """
    queue.insert(index, person_name)
    return queue

def remove_the_mean_person(queue, person_name):
    """
    Remove a specific person from the queue.
    
    Args:
        queue (list): Current queue
        person_name (str): Name to remove
        
    Returns:
        list: Updated queue
    """
    queue.remove(person_name)
    return queue

def how_many_namefellows(queue, person_name):
    """
    Count how many times a name appears in the queue.
    
    Args:
        queue (list): Current queue
        person_name (str): Name to count
        
    Returns:
        int: Number of occurrences
    """
    return queue.count(person_name)

def remove_the_last_person(queue):
    """
    Remove and return the last person in the queue.
    
    Args:
        queue (list): Current queue
        
    Returns:
        str: Name of removed person
    """
    return queue.pop()

def sorted_names(queue):
    """
    Return a sorted copy of the queue.
    
    Args:
        queue (list): Current queue
        
    Returns:
        list: Alphabetically sorted copy
    """
    return sorted(queue)