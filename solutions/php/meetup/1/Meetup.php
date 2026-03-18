<?php
declare(strict_types=1);

function meetup_day(int $year, int $month, string $which, string $weekday): DateTimeImmutable
{
    $date = new DateTimeImmutable("$year-$month-01");
    
    switch ($which) {
        case 'first':
            // First weekday of month
            return $date->modify("first $weekday of this month");
            
        case 'second':
            return $date->modify("first $weekday of this month")->modify('+1 week');
            
        case 'third':
            return $date->modify("first $weekday of this month")->modify('+2 weeks');
            
        case 'fourth':
            return $date->modify("first $weekday of this month")->modify('+3 weeks');
            
        case 'last':
            return $date->modify("last $weekday of this month");
            
        case 'teenth':
            // Days 13-19
            for ($day = 13; $day <= 19; $day++) {
                $candidate = new DateTimeImmutable("$year-$month-$day");
                if ($candidate->format('l') === $weekday) {
                    return $candidate;
                }
            }
            // Should never reach here
            throw new \Exception("No teenth $weekday found in $year-$month");
            
        default:
            throw new \InvalidArgumentException("Invalid 'which': $which");
    }
}
?>