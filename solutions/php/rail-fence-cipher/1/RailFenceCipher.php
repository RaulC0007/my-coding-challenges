<?php
declare(strict_types=1);

function encode(string $plainMessage, int $rails): string
{
    $len = strlen($plainMessage);
    $fence = array_fill(0, $rails, array_fill(0, $len, ''));
    $rail = 0;
    $dir = 1; // 1 = down, -1 = up

    for ($i = 0; $i < $len; $i++) {
        $fence[$rail][$i] = $plainMessage[$i];
        $rail += $dir;
        if ($rail === 0 || $rail === $rails - 1) {
            $dir = -$dir;
        }
    }

    $result = '';
    for ($r = 0; $r < $rails; $r++) {
        for ($i = 0; $i < $len; $i++) {
            if ($fence[$r][$i] !== '') {
                $result .= $fence[$r][$i];
            }
        }
    }
    return $result;
}

function decode(string $cipherMessage, int $rails): string
{
    $len = strlen($cipherMessage);
    $fence = array_fill(0, $rails, array_fill(0, $len, ''));

    // Mark positions in zigzag pattern
    $rail = 0;
    $dir = 1;
    for ($i = 0; $i < $len; $i++) {
        $fence[$rail][$i] = '*';
        $rail += $dir;
        if ($rail === 0 || $rail === $rails - 1) {
            $dir = -$dir;
        }
    }

    // Fill marked positions with ciphertext characters rail by rail
    $idx = 0;
    for ($r = 0; $r < $rails; $r++) {
        for ($i = 0; $i < $len; $i++) {
            if ($fence[$r][$i] === '*') {
                $fence[$r][$i] = $cipherMessage[$idx++];
            }
        }
    }

    // Read zigzag to get plaintext
    $result = '';
    $rail = 0;
    $dir = 1;
    for ($i = 0; $i < $len; $i++) {
        $result .= $fence[$rail][$i];
        $rail += $dir;
        if ($rail === 0 || $rail === $rails - 1) {
            $dir = -$dir;
        }
    }
    return $result;
}
?>