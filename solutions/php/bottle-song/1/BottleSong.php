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

class BottleSong
{
    private const WORDS = [
        0  => 'no',
        1  => 'one',
        2  => 'two',
        3  => 'three',
        4  => 'four',
        5  => 'five',
        6  => 'six',
        7  => 'seven',
        8  => 'eight',
        9  => 'nine',
        10 => 'ten',
    ];

    public function verse(int $number): string
    {
        $currentWord = ucfirst(self::WORDS[$number]);
        $nextWord    = self::WORDS[$number - 1];
        $currentBottle = $number === 1 ? 'bottle' : 'bottles';
        $nextBottle    = ($number - 1) === 1 ? 'bottle' : 'bottles';

        return "$currentWord green $currentBottle hanging on the wall,\n"
             . "$currentWord green $currentBottle hanging on the wall,\n"
             . "And if one green bottle should accidentally fall,\n"
             . "There'll be $nextWord green $nextBottle hanging on the wall.";
    }

    public function verses(int $start, int $size): string
    {
        $verses = [];
        for ($i = $start; $i > $start - $size; $i--) {
            $verses[] = $this->verse($i);
        }
        return implode("\n\n", $verses);
    }

    public function lyrics(): string
    {
        return $this->verses(10, 10);
    }
}