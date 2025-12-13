<?php

declare(strict_types=1);

class Allergen
{
    public const EGGS = 1;
    public const PEANUTS = 2;
    public const SHELLFISH = 4;
    public const STRAWBERRIES = 8;
    public const TOMATOES = 16;
    public const CHOCOLATE = 32;
    public const POLLEN = 64;
    public const CATS = 128;

    private int $value;

    public function __construct(int $value)
    {
        $this->value = $value;
    }

    public static function allergenList(): array
    {
        return [
            new self(self::EGGS),
            new self(self::PEANUTS),
            new self(self::SHELLFISH),
            new self(self::STRAWBERRIES),
            new self(self::TOMATOES),
            new self(self::CHOCOLATE),
            new self(self::POLLEN),
            new self(self::CATS),
        ];
    }

    public function getValue(): int
    {
        return $this->value;
    }

    // Add getScore() method to satisfy the tests
    public function getScore(): int
    {
        return $this->value;
    }
}

class Allergies
{
    private int $score;

    public function __construct(int $score)
    {
        $this->score = $score;
    }

    public function isAllergicTo(Allergen $allergen): bool
    {
        return ($this->score & $allergen->getValue()) !== 0;
    }

    public function getList(): array
    {
        $allergies = [];
        foreach (Allergen::allergenList() as $allergen) {
            if ($this->isAllergicTo($allergen)) {
                $allergies[] = $allergen;
            }
        }
        return $allergies;
    }
}