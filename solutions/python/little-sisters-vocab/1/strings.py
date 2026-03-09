def add_prefix_un(word):
    """Add 'un' prefix to the given word."""
    return "un" + word

def make_word_groups(vocab_words):
    """Create word groups by applying prefix to each word."""
    prefix = vocab_words[0]
    words = vocab_words[1:]
    prefixed_words = [prefix + word for word in words]
    return " :: ".join([prefix] + prefixed_words)

def remove_suffix_ness(word):
    """Remove 'ness' suffix and handle spelling changes."""
    root = word[:-4]  # Remove 'ness'
    if root.endswith('i'):
        return root[:-1] + 'y'
    return root

def adjective_to_verb(sentence, index):
    """Convert adjective to verb by adding 'en', handling punctuation."""
    words = sentence.split()
    adjective = words[index]
    
    # Remove all trailing punctuation
    adjective_clean = adjective.rstrip('.,!?;:"\'')
    
    # Ensure only alphabetical characters remain
    adjective_clean = ''.join(char for char in adjective_clean if char.isalpha())
    
    return adjective_clean + 'en'

    # Test cases that now pass
print(adjective_to_verb('His expression went dark.', -1))  # 'darken'
print(adjective_to_verb('The bread got hard after sitting out.', 3))  # 'harden'
print(adjective_to_verb('Look at the bright sky.', -2))  # 'brighten'
print(adjective_to_verb('The butter got soft in the sun.', 3))  # 'soften'
print(adjective_to_verb('Her eyes were light blue.', -2))  # 'lighten'
