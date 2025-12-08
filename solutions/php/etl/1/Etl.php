<?php
declare(strict_types=1);

function transform(array $input): array
{
    $result = [];
    foreach ($input as $points => $letters) {
        foreach ($letters as $letter) {
            $result[strtolower($letter)] = $points;
        }
    }
    return $result;
}
?>