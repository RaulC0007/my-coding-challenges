def get_list_of_wagons(*args):
    return list(args)

def fix_list_of_wagons(wagons, missing_wagons):
    # Unpack first two wagons and the rest
    first, second, *rest = wagons
    
    # Find the locomotive (1) in the remaining wagons
    for i, wagon in enumerate(rest):
        if wagon == 1:
            # Reconstruct the list with missing wagons inserted after locomotive
            return [1, *missing_wagons, *rest[i+1:], first, second]
    return wagons  # fallback if locomotive not found
 
def add_missing_stops(routing, **stops):
    # Extract stop numbers and sort them
    stop_numbers = sorted(int(key.split('_')[1]) for key in stops if key.startswith('stop_'))
    # Create ordered list of stops
    routing['stops'] = [stops[f'stop_{num}'] for num in stop_numbers]
    return routing   
    
def extend_route_information(route, more_route_information):
    return {**route, **more_route_information}

def fix_wagon_depot(wagons_rows):
    # Unpack the three color rows
    red_row, blue_row, orange_row = wagons_rows
    
    # Unpack each row's wagons
    (red1, red2, red3) = red_row
    (blue1, blue2, blue3) = blue_row
    (orange1, orange2, orange3) = orange_row
    
    # Reconstruct the grid by color columns
    return [
        [red1, blue1, orange1],
        [red2, blue2, orange2],
        [red3, blue3, orange3]
    ]
def fix_wagon_depot(wagons_rows):
    # Using zip to transpose the rows into columns
    return [list(column) for column in zip(*wagons_rows)]
