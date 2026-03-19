<?php

declare(strict_types=1);

class SimpleCipher
{
    public string $key;

    public function __construct(?string $key = null)
    {
        if ($key === null) {
            // Generate random key of at least 100 lowercase letters
            $this->key = $this->generateRandomKey();
        } else {
            // Validate provided key
            if ($key === '' || !preg_match('/^[a-z]+$/', $key)) {
                throw new InvalidArgumentException('Key must consist of lowercase letters only.');
            }
            $this->key = $key;
        }
    }

    private function generateRandomKey(int $length = 100): string
    {
        $key = '';
        for ($i = 0; $i < $length; $i++) {
            // Generate random lowercase letter a-z
            $key .= chr(97 + mt_rand(0, 25));
        }
        return $key;
    }

    public function encode(string $plainText): string
    {
        return $this->transform($plainText, true);
    }

    public function decode(string $cipherText): string
    {
        return $this->transform($cipherText, false);
    }

    private function transform(string $text, bool $encode): string
    {
        $result = '';
        $keyLength = strlen($this->key);
        $keyIndex = 0;

        for ($i = 0; $i < strlen($text); $i++) {
            $char = $text[$i];

            // Only transform lowercase letters
            if (ctype_lower($char)) {
                $shift = ord($this->key[$keyIndex % $keyLength]) - ord('a'); // 0–25

                if ($encode) {
                    $newChar = chr(((ord($char) - ord('a') + $shift) % 26) + ord('a'));
                } else {
                    $newChar = chr(((ord($char) - ord('a') - $shift + 26) % 26) + ord('a'));
                }

                $result .= $newChar;
                $keyIndex++;
            } else {
                // Non-letter characters are copied unchanged
                $result .= $char;
            }
        }

        return $result;
    }
}