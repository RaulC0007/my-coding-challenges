<?php

declare(strict_types=1);

class House
{
    private array $phrases = [
        'This is the house that Jack built.',
        'This is the malt',
        'This is the rat',
        'This is the cat',
        'This is the dog',
        'This is the cow with the crumpled horn',
        'This is the maiden all forlorn',
        'This is the man all tattered and torn',
        'This is the priest all shaven and shorn',
        'This is the rooster that crowed in the morn',
        'This is the farmer sowing his corn',
        'This is the horse and the hound and the horn'
    ];

    private array $actions = [
        '',
        'that lay in the house that Jack built.',
        'that ate the malt',
        'that killed the rat',
        'that worried the cat',
        'that tossed the dog',
        'that milked the cow with the crumpled horn',
        'that kissed the maiden all forlorn',
        'that married the man all tattered and torn',
        'that woke the priest all shaven and shorn',
        'that kept the rooster that crowed in the morn',
        'that belonged to the farmer sowing his corn'
    ];

    public function verse(int $verseNumber): array
    {
        // Convert to 0-based index
        $index = $verseNumber - 1;
        
        // Validate verse number
        if ($index < 0 || $index >= count($this->phrases)) {
            throw new InvalidArgumentException("Verse number must be between 1 and " . count($this->phrases));
        }
        
        // Build the verse line by line
        $result = [];
        $result[] = $this->phrases[$index];
        
        // Add each action in reverse order (from current verse back to verse 1)
        for ($i = $index; $i > 0; $i--) {
            $result[] = $this->actions[$i];
        }
        
        return $result;
    }

    public function verses(int $start, int $end): array
    {
        // Validate start and end numbers
        if ($start < 1 || $end > count($this->phrases) || $start > $end) {
            throw new InvalidArgumentException("Invalid verse range");
        }
        
        // Build all verses with empty lines between them
        $result = [];
        for ($i = $start; $i <= $end; $i++) {
            $verse = $this->verse($i);
            foreach ($verse as $line) {
                $result[] = $line;
            }
            
            // Add empty line between verses (except after the last verse)
            if ($i < $end) {
                $result[] = '';
            }
        }
        
        return $result;
    }
}