<?php
declare(strict_types=1);

function flatten(array $input): array
{
    $result = [];
    
    foreach ($input as $item) {
        if (is_array($item)) {
            $result = array_merge($result, flatten($item));
        } elseif ($item !== null) {
            $result[] = $item;
        }
    }
    
    return $result;
}
?>