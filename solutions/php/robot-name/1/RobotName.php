<?php
declare(strict_types=1);

class Robot
{
    private string $name;
    /** @var array<string> names not yet handed out */
    private static array $pool = [];

    public function __construct()
    {
        $this->regenerate();
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function reset(): void
    {
        $this->regenerate();
    }

    /* ----------  internal helpers  ---------- */
    private function regenerate(): void
    {
        if (self::$pool === []) {
            self::buildPool();          // first robot or after reset
        }

        if (self::$pool === []) {
            throw new RuntimeException('No more unique robot names available');
        }

        $this->name = array_pop(self::$pool);
    }

    /** fills the static pool with ALL possible names once */
    private static function buildPool(): void
    {
        for ($l1 = 65; $l1 <= 90; $l1++) {
            for ($l2 = 65; $l2 <= 90; $l2++) {
                for ($d = 0; $d < 1000; $d++) {
                    self::$pool[] = chr($l1).chr($l2).sprintf('%03d', $d);
                }
            }
        }
        shuffle(self::$pool);   // random order
    }
}