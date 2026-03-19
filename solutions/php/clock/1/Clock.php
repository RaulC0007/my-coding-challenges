<?php

declare(strict_types=1);

class Clock implements Stringable
{
    private int $minutes;

    public function __construct(int $hour, int $minute = 0)
    {
        // Convert everything to total minutes, normalize to 0–1439 range
        $totalMinutes = ($hour * 60 + $minute) % 1440;

        // Handle negative values correctly
        if ($totalMinutes < 0) {
            $totalMinutes += 1440;
        }

        $this->minutes = $totalMinutes;
    }

    public function __toString(): string
    {
        $hours   = intdiv($this->minutes, 60);
        $minutes = $this->minutes % 60;

        return sprintf('%02d:%02d', $hours, $minutes);
    }

    public function add(int $minutesToAdd): self
    {
        return new self(0, $this->minutes + $minutesToAdd);
    }

    public function sub(int $minutesToSubtract): self
    {
        return new self(0, $this->minutes - $minutesToSubtract);
    }

    public function equals(self $other): bool
    {
        return $this->minutes === $other->minutes;
    }
}