<?php
declare(strict_types=1);

class SpaceAge
{
    private int $seconds;
    private const EARTH_SECONDS_PER_YEAR = 31557600;
    private const ORBITAL_PERIODS = [
        'earth'    => 1.0,
        'mercury'  => 0.2408467,
        'venus'    => 0.61519726,
        'mars'     => 1.8808158,
        'jupiter'  => 11.862615,
        'saturn'   => 29.447498,
        'uranus'   => 84.016846,
        'neptune'  => 164.79132,
    ];

    public function __construct(int $seconds)
    {
        $this->seconds = $seconds;
    }

    private function ageOn(string $planet): float
    {
        $earthAge = $this->seconds / self::EARTH_SECONDS_PER_YEAR;
        return round($earthAge / self::ORBITAL_PERIODS[$planet], 2);
    }

    public function earth(): float    { return $this->ageOn('earth'); }
    public function mercury(): float  { return $this->ageOn('mercury'); }
    public function venus(): float    { return $this->ageOn('venus'); }
    public function mars(): float     { return $this->ageOn('mars'); }
    public function jupiter(): float  { return $this->ageOn('jupiter'); }
    public function saturn(): float   { return $this->ageOn('saturn'); }
    public function uranus(): float   { return $this->ageOn('uranus'); }
    public function neptune(): float  { return $this->ageOn('neptune'); }
}
?>