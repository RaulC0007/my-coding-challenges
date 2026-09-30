<?php

/*
 * By adding type hints and enabling strict type checking, code can become
 * easier to read, self-documenting and reduce the number of potential bugs.
 * By default, type declarations are non-strict, which means they will attempt
 * to change the original type to match the type specified by the
 * type-declaration.
 *
 * In other words, if you pass a string to a function requiring a float,
 * it will attempt to convert the string value to a float.
 *
 * To enable strict mode, a single declare directive must be placed at the top
 * of the file.
 * This means that the strictness of typing is configured on a per-file basis.
 * This directive not only affects the type declarations of parameters, but also
 * a function's return type.
 *
 * For more info review the Concept on strict type checking in the PHP track
 * <link>.
 *
 * To disable strict typing, comment out the directive below.
 */

declare(strict_types=1);

function degreeOfSeparation(array $familyTree, string $personA, string $personB): int
{
    // Same person has 0 separation
    if ($personA === $personB) {
        return 0;
    }

    // Build an undirected adjacency list representing the family network
    $adj = [];
    foreach ($familyTree as $parent => $children) {
        // Normalize children to always be an array
        $children = is_array($children) ? $children : [$children];
        
        // Connect parent to each child (bidirectional, 1 degree)
        foreach ($children as $child) {
            $adj[$parent][] = $child;
            $adj[$child][] = $parent;
        }
        
        // Connect siblings to each other (bidirectional, 1 degree as per instructions)
        $childCount = count($children);
        for ($i = 0; $i < $childCount; $i++) {
            for ($j = $i + 1; $j < $childCount; $j++) {
                $adj[$children[$i]][] = $children[$j];
                $adj[$children[$j]][] = $children[$i];
            }
        }
    }

    // Breadth-First Search to find the shortest path
    $queue = [$personA];
    $distances = [$personA => 0];
    $head = 0;

    while (isset($queue[$head])) {
        $current = $queue[$head++];
        
        if ($current === $personB) {
            return $distances[$current];
        }

        foreach ($adj[$current] ?? [] as $neighbor) {
            if (!isset($distances[$neighbor])) {
                $distances[$neighbor] = $distances[$current] + 1;
                $queue[] = $neighbor;
            }
        }
    }

    // No connection found
    return -1;
}