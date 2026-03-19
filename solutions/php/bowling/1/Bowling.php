<?php
declare(strict_types=1);

class Game
{
    private array $rolls = [];
    private int $count   = 0;          // how many rolls stored

    /* ----------  API  ---------- */
    public function roll(int $pins): void
    {
        if ($this->isComplete()) {
            throw new InvalidArgumentException('Cannot roll after game is over');
        }
        if ($pins < 0 || $pins > 10) {
            throw new InvalidArgumentException('Pins must be between 0 and 10');
        }

        /* 10th-frame special-case validation (fill-balls) */
        if ($this->isInTenth()) {
            $this->validateTenth($pins);
        } else {
            /* frames 1-9 : normal frame sanity checks */
            $this->validateNormal($pins);
        }

        $this->rolls[$this->count++] = $pins;
    }

    public function score(): int
    {
        if (!$this->isComplete()) {
            throw new InvalidArgumentException('Score cannot be taken until the end of the game');
        }

        $score = 0;
        $i     = 0;                       // roll cursor

        for ($frame = 0; $frame < 10; $frame++) {
            /* ----- strike ----- */
            if ($this->rolls[$i] === 10) {
                $score += 10 + $this->rolls[$i + 1] + $this->rolls[$i + 2];
                $i++;
            }
            /* ----- spare ----- */
            elseif ($this->rolls[$i] + $this->rolls[$i + 1] === 10) {
                $score += 10 + $this->rolls[$i + 2];
                $i += 2;
            }
            /* ----- open ----- */
            else {
                $score += $this->rolls[$i] + $this->rolls[$i + 1];
                $i += 2;
            }
        }
        return $score;
    }

    /* ----------  helpers  ---------- */
    private function isComplete(): bool
    {
        /* no rolls → not complete */
        if ($this->count === 0) return false;

        $i = 0;

        /* walk through 10 frames */
        for ($f = 0; $f < 9; $f++) {
            if (!isset($this->rolls[$i])) return false;

            if ($this->rolls[$i] === 10) {            // strike
                $i++;
            } else {
                if (!isset($this->rolls[$i + 1])) return false;
                $i += 2;
            }
        }

        /* ---------- 10th frame ---------- */
        if (!isset($this->rolls[$i])) return false;

        /* strike → need two more rolls */
        if ($this->rolls[$i] === 10) {
            return isset($this->rolls[$i + 2]);
        }

        /* spare → need one more roll */
        if (isset($this->rolls[$i + 1]) &&
            $this->rolls[$i] + $this->rolls[$i + 1] === 10) {
            return isset($this->rolls[$i + 2]);
        }

        /* open frame → exactly two rolls */
        return isset($this->rolls[$i + 1]);
    }

    private function isInTenth(): bool
    {
        $i = 0;
        for ($f = 0; $f < 9; $f++) {
            if (!isset($this->rolls[$i])) return false;

            $this->rolls[$i] === 10 ? $i++ : $i += 2;
        }
        return $i < $this->count;   // cursor is inside 10th frame
    }

    private function validateNormal(int $pins): void
    {
        $i = $this->count;

        /* first roll of frame → nothing to check */
        if ($i % 2 === 0) return;

        /* if the previous roll was a strike we are already in a NEW frame */
        if ($this->rolls[$i - 1] === 10) return;

        /* second roll → may not exceed 10 total */
        if (($this->rolls[$i - 1] + $pins) > 10) {
            throw new InvalidArgumentException('Pin count exceeds 10 in a frame');
        }
    }

    private function validateTenth(int $pins): void
    {
        $i   = $this->count;
        $off = $i - 18;               // offset inside 10th-frame rolls

        /* roll 1 → anything 0-10 is fine */
        if ($off === 0) return;

        $r1 = $this->rolls[18];

        /* roll 2 */
        if ($off === 1) {
            if ($r1 !== 10 && ($r1 + $pins) > 10) {
                throw new InvalidArgumentException('Pin count exceeds 10 in a frame');
            }
            return;
        }

        /* roll 3 (fill ball) */
        $r2 = $this->rolls[19];

        if ($r1 === 10) {                       // strike first
            if ($r2 !== 10 && ($r2 + $pins) > 10) {
                throw new InvalidArgumentException('Second and third bonus rolls cannot exceed 10 points');
            }
        }
        /* $r1 + $r2 === 10  (spare) → any third ball is legal */
    }
}