def capitalize_title(title):
    """
    Capitalize the first letter of each word in the title.
    
    Args:
        title (str): The title to be capitalized
        
    Returns:
        str: Title in proper title case
    """
    return title.title()

def check_sentence_ending(sentence):
    """
    Check if the sentence ends with a period.
    
    Args:
        sentence (str): The sentence to check
        
    Returns:
        bool: True if sentence ends with period, False otherwise
    """
    return sentence.endswith('.')

def clean_up_spacing(sentence):
    """
    Remove extra whitespace from the beginning and end of the sentence.
    
    Args:
        sentence (str): The sentence to clean
        
    Returns:
        str: Sentence with leading/trailing whitespace removed
    """
    return sentence.strip()

def replace_word_choice(sentence, old_word, new_word):
    """
    Replace all instances of old_word with new_word in the sentence.
    
    Args:
        sentence (str): The original sentence
        old_word (str): Word to be replaced
        new_word (str): Word to replace with
        
    Returns:
        str: Updated sentence with replacements
    """
    return sentence.replace(old_word, new_word)

    print(capitalize_title("my hobbies"))  # Output: "My Hobbies"
print(check_sentence_ending("I like to hike, bake, and read."))  # True
print(clean_up_spacing("  I like to go on hikes with my dog.  "))  # "I like to go on hikes with my dog."
print(replace_word_choice("I bake good cakes.", "good", "amazing"))  # "I bake amazing cakes."