import re

class SgfTree:
    def __init__(self, properties=None, children=None):
        self.properties = properties or {}
        self.children = children or []

    def __eq__(self, other):
        if not isinstance(other, SgfTree):
            return False
        if self.properties != other.properties:
            return False
        if len(self.children) != len(other.children):
            return False
        for a, b in zip(self.children, other.children):
            if a != b:
                return False
        return True

    def __ne__(self, other):
        return not self == other

def parse(input_string):
    if not input_string:
        raise ValueError("tree missing")
    
    if not input_string.startswith('(') or not input_string.endswith(')'):
        raise ValueError("tree missing")
    
    # Remove outer parentheses
    content = input_string[1:-1]
    
    if not content:
        raise ValueError("tree with no nodes")
    
    return parse_game_tree(content)

def parse_game_tree(content):
    """Parse a complete game tree."""
    if not content.startswith(';'):
        raise ValueError("tree with no nodes")
    
    # Parse the sequence of nodes
    nodes = []
    pos = 0
    
    while pos < len(content) and content[pos] == ';':
        node, new_pos = parse_single_node(content, pos)
        nodes.append(node)
        pos = new_pos
    
    if not nodes:
        raise ValueError("tree with no nodes")
    
    # Link nodes in sequence
    root = nodes[0]
    current = root
    for node in nodes[1:]:
        current.children = [node]
        current = node
    
    # Parse child game trees (variations)
    while pos < len(content):
        if content[pos] == '(':
            # Find the matching closing parenthesis
            paren_count = 1
            start = pos + 1
            end = pos + 1
            
            while end < len(content) and paren_count > 0:
                if content[end] == '(':
                    paren_count += 1
                elif content[end] == ')':
                    paren_count -= 1
                end += 1
            
            if paren_count > 0:
                raise ValueError("tree missing")
            
            # Parse the child tree
            child_content = content[start:end-1]
            child_tree = parse_game_tree(child_content)
            current.children.append(child_tree)
            
            pos = end
        else:
            pos += 1
    
    return root

def parse_single_node(content, start_pos):
    """Parse a single node starting with ';'."""
    if content[start_pos] != ';':
        raise ValueError("tree with no nodes")
    
    pos = start_pos + 1  # Skip ';'
    properties = {}
    
    # Parse properties until we hit ';', '(', or end of content
    while pos < len(content):
        char = content[pos]
        
        if char == ';' or char == '(':
            break
        
        if not char.isalpha():
            if char.isspace():
                pos += 1
                continue
            else:
                raise ValueError("properties without delimiter")
        
        # Parse property key
        key_start = pos
        while pos < len(content) and content[pos].isalpha():
            pos += 1
        
        key = content[key_start:pos]
        
        # Validate key is uppercase
        if not key.isupper():
            raise ValueError("property must be in uppercase")
        
        # Parse property values
        values = []
        
        # Skip any whitespace
        while pos < len(content) and content[pos].isspace():
            pos += 1
        
        if pos >= len(content) or content[pos] != '[':
            raise ValueError("properties without delimiter")
        
        # Parse all values for this property
        while pos < len(content) and content[pos] == '[':
            value, new_pos = parse_property_value(content, pos)
            values.append(value)
            pos = new_pos
            
            # Skip whitespace between values
            while pos < len(content) and content[pos].isspace():
                pos += 1
        
        if not values:
            raise ValueError("properties without delimiter")
        
        properties[key] = values
    
    return SgfTree(properties=properties), pos

def parse_property_value(content, start_pos):
    """Parse a single property value enclosed in brackets."""
    if content[start_pos] != '[':
        raise ValueError("properties without delimiter")
    
    pos = start_pos + 1  # Skip '['
    value_chars = []
    
    while pos < len(content):
        char = content[pos]
        
        if char == '\\':
            # Handle escape sequences
            if pos + 1 < len(content):
                next_char = content[pos + 1]
                if next_char == '\n':
                    # Escaped newline - remove both characters completely
                    pos += 2
                else:
                    # Escaped character - include the escaped character literally
                    value_chars.append(next_char)
                    pos += 2
            else:
                # Backslash at end of string
                value_chars.append('\\')
                pos += 1
        elif char == ']':
            # End of value
            pos += 1  # Skip ']'
            break
        else:
            value_chars.append(char)
            pos += 1
    else:
        # Reached end without finding closing bracket
        raise ValueError("properties without delimiter")
    
    # Process the raw value according to SGF rules
    raw_value = ''.join(value_chars)
    
    # Convert all whitespace characters (except newlines) to spaces
    processed_value = ''.join(' ' if c.isspace() and c != '\n' else c for c in raw_value)
    
    return processed_value, pos