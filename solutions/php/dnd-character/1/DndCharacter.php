<?php
declare(strict_types=1);

class DndCharacter
{
    public int $strength;
    public int $dexterity;
    public int $constitution;
    public int $intelligence;
    public int $wisdom;
    public int $charisma;
    public int $hitpoints;

    /**
     * Creates a new random character.
     */
    public static function generate(): self
    {
        $character = new self();
        return $character;
    }

    public function __construct()
    {
        $this->strength = self::ability();
        $this->dexterity = self::ability();
        $this->constitution = self::ability();
        $this->intelligence = self::ability();
        $this->wisdom = self::ability();
        $this->charisma = self::ability();
        
        $modifier = self::modifier($this->constitution);
        $this->hitpoints = 10 + $modifier;
    }

    /**
     * Rolls four 6-sided dice and returns the sum of the largest three.
     */
    public static function ability(): int
    {
        $rolls = [];
        for ($i = 0; $i < 4; $i++) {
            $rolls[] = random_int(1, 6);
        }
        sort($rolls);
        // Sum highest 3 (discard the lowest)
        return array_sum(array_slice($rolls, 1));
    }

    /**
     * Calculates the modifier for a given score.
     */
    public static function modifier(int $score): int
    {
        return (int)floor(($score - 10) / 2);
    }
}