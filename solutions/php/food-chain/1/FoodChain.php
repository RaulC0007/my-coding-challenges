<?php

/*
 * By adding type hints and enabling strict type checking, code can become
 * easier to read, self-documenting and reduce the number of potential bugs.
 * By default, type declarations are non-strict, which means they will attempt
 * to change the original type to match the type specified by the
 * type-declaration.
 *
 * In other words, if you pass a string to a function requiring a float,
 * it will attempt to convert the string value to a float.
 *
 * To enable strict mode, a single declare directive must be placed at the top
 * of the file.
 * This means that the strictness of typing is configured on a per-file basis.
 * This directive not only affects the type declarations of parameters, but also
 * a function's return type.
 *
 * For more info review the Concept on strict type checking in the PHP track
 * <link>.
 *
 * To disable strict typing, comment out the directive below.
 */

declare(strict_types=1);

class FoodChain
{
    private array $animals = [
        'fly',
        'spider',
        'bird',
        'cat',
        'dog',
        'goat',
        'cow',
        'horse'
    ];
    
    private array $reactions = [
        'fly' => "I don't know why she swallowed the fly. Perhaps she'll die.",
        'spider' => "It wriggled and jiggled and tickled inside her.",
        'bird' => "How absurd to swallow a bird!",
        'cat' => "Imagine that, to swallow a cat!",
        'dog' => "What a hog, to swallow a dog!",
        'goat' => "Just opened her throat and swallowed a goat!",
        'cow' => "I don't know how she swallowed a cow!",
        'horse' => "She's dead, of course!"
    ];
    
    public function verse(int $verseNumber): array
    {
        $index = $verseNumber - 1;
        $animal = $this->animals[$index];
        $lines = [];
        
        // First line
        $lines[] = "I know an old lady who swallowed a $animal.";
        
        // Special case for horse (last verse) - ends immediately
        if ($animal === 'horse') {
            $lines[] = $this->reactions[$animal];
            return $lines;
        }
        
        // Reaction line specific to the animal
        $lines[] = $this->reactions[$animal];
        
        // Cumulative lines - going backwards from current animal down to fly
        for ($i = $index; $i > 0; $i--) {
            $current = $this->animals[$i];
            $previous = $this->animals[$i - 1];
            
            $line = "She swallowed the $current to catch the $previous";
            
            // Special case: spider has extra description when being caught
            if ($previous === 'spider') {
                $line .= " that wriggled and jiggled and tickled inside her";
            }
            
            $line .= ".";
            $lines[] = $line;
        }
        
        // Final fly line (only add if this isn't already the fly verse)
        if ($animal !== 'fly') {
            $lines[] = $this->reactions['fly'];
        }
        
        return $lines;
    }
    
    public function verses(int $start, int $end): array
    {
        $result = [];
        
        for ($i = $start; $i <= $end; $i++) {
            $result = array_merge($result, $this->verse($i));
            
            // Add empty line between verses (but not after the last one)
            if ($i < $end) {
                $result[] = '';
            }
        }
        
        return $result;
    }
    
    public function song(): array
    {
        return $this->verses(1, count($this->animals));
    }
}