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

class BafflingBirthdays
{
    /**
     * Checks if any two dates in the array share the same month and day.
     */
    public function sharedBirthday(array $birthdates): bool
    {
        if (count($birthdates) < 2) {
            return false;
        }

        $monthDays = [];
        foreach ($birthdates as $date) {
            // Handle both string dates and DateTime objects
            $dt = $date instanceof \DateTimeInterface ? $date : new \DateTime($date);
            $monthDays[] = $dt->format('m-d');
        }

        // If unique month-day count is less than total count, there's a duplicate
        return count($monthDays) !== count(array_unique($monthDays));
    }

    /**
     * Generates an array of random birthdates following the 365-day uniform distribution.
     */
    public function randomBirthdates(int $count): array
    {
        // Cache the 365 valid dates for a non-leap year to ensure uniform distribution
        static $validDates = null;
        if ($validDates === null) {
            $validDates = [];
            for ($month = 1; $month <= 12; $month++) {
                $daysInMonth = (int)date('t', mktime(0, 0, 0, $month, 1, 2023));
                for ($day = 1; $day <= $daysInMonth; $day++) {
                    $validDates[] = sprintf('2023-%02d-%02d', $month, $day);
                }
            }
        }

        $birthdates = [];
        for ($i = 0; $i < $count; $i++) {
            $birthdates[] = $validDates[array_rand($validDates)];
        }
        
        return $birthdates;
    }

    /**
     * Estimates the probability of a shared birthday using Monte Carlo simulation.
     * Returns probability as a percentage (0-100).
     */
    public function estimatedProbabilityOfSharedBirthday(int $groupSize): float
    {
        $simulations = 10000;
        $sharedCount = 0;

        for ($i = 0; $i < $simulations; $i++) {
            if ($this->sharedBirthday($this->randomBirthdates($groupSize))) {
                $sharedCount++;
            }
        }

        // Return as percentage (0-100), not decimal (0-1)
        return ($sharedCount / $simulations) * 100;
    }
}