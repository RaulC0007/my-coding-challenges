<?php

declare(strict_types=1);

class Triangle
{
    private float $a;
    private float $b;
    private float $c;

    public function __construct(float $a, float $b, float $c)
    {
        // Validate that all sides are greater than 0
        if ($a <= 0 || $b <= 0 || $c <= 0) {
            throw new InvalidArgumentException('All sides must be greater than 0');
        }
        
        // Check triangle inequality: sum of any two sides must be >= third side
        if ($a + $b < $c || $a + $c < $b || $b + $c < $a) {
            throw new InvalidArgumentException('Violates triangle inequality');
        }
        
        $this->a = $a;
        $this->b = $b;
        $this->c = $c;
    }

    public function kind(): string
    {
        // Count how many unique side lengths we have
        $sides = [$this->a, $this->b, $this->c];
        $uniqueSides = array_unique($sides);
        
        if (count($uniqueSides) === 1) {
            return 'equilateral';
        }
        
        if (count($uniqueSides) === 2) {
            return 'isosceles';
        }
        
        return 'scalene';
    }
}