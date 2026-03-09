def get_coordinate(record):
    """Extract the coordinate from a (treasure, coordinate) pair."""
    return record[1]

def convert_coordinate(coordinate):
    """Convert coordinate from '2A' format to ('2', 'A') format."""
    return (coordinate[0], coordinate[1])

def compare_records(azara_record, rui_record):
    """Compare coordinates from Azara's and Rui's records."""
    azara_coord = convert_coordinate(azara_record[1])
    rui_coord = rui_record[1]
    return azara_coord == rui_coord

def create_record(azara_record, rui_record):
    """Combine records if coordinates match, otherwise return 'not a match'."""
    if compare_records(azara_record, rui_record):
        return azara_record + (rui_record[0], rui_record[1], rui_record[2])
    return "not a match"

def clean_up(combined):
    """Create a cleaned report with one set of coordinates per record."""
    report = ""
    for record in combined:
        cleaned = (record[0], record[2], record[3], record[4])
        report += f"{cleaned}\n"
    return report

    # Test get_coordinate
print(get_coordinate(('Scrimshawed Whale Tooth', '2A')))  # '2A'

# Test convert_coordinate
print(convert_coordinate("2A"))  # ('2', 'A')

# Test compare_records
print(compare_records(
    ('Brass Spyglass', '4B'),
    ('Seaside Cottages', ('1', 'C'), 'blue')
))  # False

# Test create_record
print(create_record(
    ('Model Ship in Large Bottle', '8A'),
    ('Harbor Managers Office', ('8', 'A'), 'purple')
))  # Combined tuple

# Test clean_up
print(clean_up((
    ('Brass Spyglass', '4B', 'Abandoned Lighthouse', ('4', 'B'), 'Blue'),
    ('Vintage Pirate Hat', '7E', 'Quiet Inlet (Island of Mystery)', ('7', 'E'), 'Orange')
)))