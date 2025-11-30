<?php
declare(strict_types=1);

function acronym(string $text): string
{
    // treat hyphens as word-separators, strip every other punctuation
    $words = preg_split('/[\s\-]+/', preg_replace('/[^\w\s\-]/', '', $text));
    $acronym = '';

    foreach ($words as $w) {
        if ($w !== '') {
            $acronym .= strtoupper($w[0]);
        }
    }

    return $acronym;
}