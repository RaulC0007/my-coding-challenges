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

class SplitSecondStopwatch
{
    public string $state;
    public int $total;
    public int $currentLap;
    public array $previousLaps;

    public function __construct(
        string $state = "ready",
        int $total = 0,
        int $currentLap = 0,
        array $previousLaps = []
    ) {
        $this->state = $state;
        $this->total = $total;
        $this->currentLap = $currentLap;
        $this->previousLaps = $previousLaps;
    }

    public function start(): void
    {
        if ($this->state === "running") {
            throw new \Exception("cannot start an already running stopwatch");
        }
        $this->state = "running";
    }

    public function stop(): void
    {
        if ($this->state !== "running") {
            throw new \Exception("cannot stop a stopwatch that is not running");
        }
        $this->state = "stopped";
    }

    public function lap(): void
    {
        if ($this->state !== "running") {
            throw new \Exception("cannot lap a stopwatch that is not running");
        }
        $this->previousLaps[] = $this->formatTime($this->currentLap);
        $this->currentLap = 0;
    }

    public function reset(): void
    {
        if ($this->state !== "stopped") {
            throw new \Exception("cannot reset a stopwatch that is not stopped");
        }
        $this->state = "ready";
        $this->currentLap = 0;
        $this->previousLaps = [];
        $this->total = 0;
    }

    public function advanceTime(string $duration): void
    {
        if ($this->state === "running") {
            $seconds = $this->parseDuration($duration);
            $this->currentLap += $seconds;
            $this->total += $seconds;
        }
    }

    public function getCurrentLap(): string
    {
        return $this->formatTime($this->currentLap);
    }

    public function getTotal(): string
    {
        return $this->formatTime($this->total);
    }

    private function parseDuration(string $duration): int
    {
        $parts = explode(':', $duration);
        $hours = (int)$parts[0];
        $minutes = (int)$parts[1];
        $seconds = (int)$parts[2];
        
        return ($hours * 3600) + ($minutes * 60) + $seconds;
    }

    private function formatTime(int $seconds): string
    {
        $h = intdiv($seconds, 3600);
        $m = intdiv($seconds % 3600, 60);
        $s = $seconds % 60;
        
        return sprintf("%02d:%02d:%02d", $h, $m, $s);
    }
}