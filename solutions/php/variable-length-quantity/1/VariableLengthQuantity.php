<?php
declare(strict_types=1);

function vlq_encode(array $input): array
{
    $out = [];
    foreach ($input as $n) {
        if ($n < 0 || $n > 0xFFFFFFFF) throw new InvalidArgumentException();
        $bytes = [];
        do {
            $bytes[] = $n & 0x7F;
            $n >>= 7;
        } while ($n > 0);
        // mark all but last
        for ($i = count($bytes) - 1; $i > 0; $i--) $bytes[$i] |= 0x80;
        $out = array_merge($out, array_reverse($bytes));
    }
    return $out;
}

function vlq_decode(array $input): array
{
    $out = [];
    $val = 0;
    foreach ($input as $b) {
        if ($b < 0 || $b > 0xFF) throw new InvalidArgumentException();

        /* ----- overflow guard ----- */
        if ($val > (0xFFFFFFFF >> 7)) {
            throw new OverflowException('number too large for 32 bits');
        }

        $val = ($val << 7) | ($b & 0x7F);
        if ($b & 0x80) continue;            // more bytes coming
        $out[] = $val;
        $val = 0;
    }
    if ($val !== 0) throw new InvalidArgumentException(); // unfinished number
    return $out;
}