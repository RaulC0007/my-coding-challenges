<?php

declare(strict_types=1);

class HighScores
{
    public array $scores;

    public int $latest {
        get => $this->scores[count($this->scores) - 1];
    }

    public int $personalBest {
        get => max($this->scores);
    }

    public array $personalTopThree {
        get {
            $sorted = $this->scores;
            rsort($sorted);
            return array_slice($sorted, 0, 3);
        }
    }

    public function __construct(array $scores)
    {
        $this->scores = $scores;
    }
}