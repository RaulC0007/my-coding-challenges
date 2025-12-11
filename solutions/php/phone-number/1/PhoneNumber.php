<?php
declare(strict_types=1);

class PhoneNumber
{
    private string $clean;

    public function __construct(string $input)
    {
        /* ---------- 1.  explicit forbidden characters  ---------- */
        if (preg_match('/[a-zA-Z]/', $input))
            throw new InvalidArgumentException('letters not permitted');
        if (preg_match('/[^\d\s\-\.\(\)\+]/', $input))
            throw new InvalidArgumentException('punctuations not permitted');

        /* ---------- 2.  keep only digits  ---------- */
        $digits = preg_replace('/\D+/', '', $input);

        /* ---------- 3.  country code  ---------- */
        if (strlen($digits) === 11 && $digits[0] === '1') {
            $digits = substr($digits, 1);
        } elseif (strlen($digits) === 11) {
            throw new InvalidArgumentException('11 digits must start with 1');
        } elseif (strlen($digits) !== 10) {
            throw new InvalidArgumentException('must not be fewer than 10 digits or more than 11 digits');
        }

        /* ---------- 4.  N-digit checks  ---------- */
        if ($digits[0] === '0')
            throw new InvalidArgumentException('area code cannot start with zero');
        if ($digits[0] === '1')
            throw new InvalidArgumentException('area code cannot start with one');
        if ($digits[3] === '0')
            throw new InvalidArgumentException('exchange code cannot start with zero');
        if ($digits[3] === '1')
            throw new InvalidArgumentException('exchange code cannot start with one');

        $this->clean = $digits;
    }

    public function number(): string
    {
        return $this->clean;
    }
}