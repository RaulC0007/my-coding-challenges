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

class TwelveDays
{
    private const GIFTS = [
        1 => "a Partridge in a Pear Tree",
        2 => "two Turtle Doves",
        3 => "three French Hens",
        4 => "four Calling Birds",
        5 => "five Gold Rings",
        6 => "six Geese-a-Laying",
        7 => "seven Swans-a-Swimming",
        8 => "eight Maids-a-Milking",
        9 => "nine Ladies Dancing",
        10 => "ten Lords-a-Leaping",
        11 => "eleven Pipers Piping",
        12 => "twelve Drummers Drumming"
    ];

    private const ORDINALS = [
        1 => "first",
        2 => "second", 
        3 => "third",
        4 => "fourth",
        5 => "fifth",
        6 => "sixth",
        7 => "seventh",
        8 => "eighth",
        9 => "ninth",
        10 => "tenth",
        11 => "eleventh",
        12 => "twelfth"
    ];

    public function recite(int $start, int $end): string
    {
        $verses = [];
        
        for ($day = $start; $day <= $end; $day++) {
            $verse = "On the " . self::ORDINALS[$day] . " day of Christmas my true love gave to me: ";
            
            $gifts = [];
            for ($i = $day; $i >= 1; $i--) {
                if ($i === 1 && $day > 1) {
                    // For the first gift in multi-day verses, add "and"
                    $gifts[] = "and " . self::GIFTS[$i];
                } else {
                    $gifts[] = self::GIFTS[$i];
                }
            }
            
            $verse .= implode(", ", $gifts) . ".";
            $verses[] = $verse;
        }
        
        return implode("\n", $verses);
    }
}
