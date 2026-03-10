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

class ZebraPuzzle
{
    private ?string $waterDrinker = null;
    private ?string $zebraOwner = null;
    private bool $solved = false;

    public function __construct()
    {
        $this->solve();
    }

    public function waterDrinker(): string
    {
        if (!$this->solved) {
            $this->solve();
        }
        return $this->waterDrinker;
    }

    public function zebraOwner(): string
    {
        if (!$this->solved) {
            $this->solve();
        }
        return $this->zebraOwner;
    }

    private function solve(): void
    {
        // Possible values for each category
        $nationalities = ['Englishman', 'Spaniard', 'Ukrainian', 'Norwegian', 'Japanese'];
        $colors = ['Red', 'Green', 'Ivory', 'Yellow', 'Blue'];
        $pets = ['Dog', 'Snail', 'Fox', 'Horse', 'Zebra'];
        $drinks = ['Coffee', 'Tea', 'Milk', 'Orange Juice', 'Water'];
        $hobbies = ['Dancing', 'Painter', 'Reading', 'Football', 'Chess'];

        // We know from clue 10: The Norwegian lives in the first house (index 0).
        // We know from clue 9: Milk is drunk in the middle house (index 2).
        // We know from clue 15: The Norwegian lives next to the blue house. So House 2 (index 1) is Blue.

        // To optimize, we can permute the remaining items and check constraints.
        // However, given the small search space (5!^4 is large, but constraints prune heavily),
        // we can use a recursive backtracking approach or nested loops with early pruning.
        
        // Let's use a permutation generator approach for simplicity in code structure,
        // applying constraints as soon as possible.

        $indices = [0, 1, 2, 3, 4];

        // Helper to generate permutations
        $getPermutations = function(array $items) use (&$getPermutations): array {
            if (count($items) <= 1) {
                return [$items];
            }
            $result = [];
            foreach ($items as $i => $item) {
                $remaining = $items;
                unset($remaining[$i]);
                $remaining = array_values($remaining);
                foreach ($getPermutations($remaining) as $perm) {
                    array_unshift($perm, $item);
                    $result[] = $perm;
                }
            }
            return $result;
        };

        // Pre-apply known constraints to reduce search space:
        // Nationalities: Norwegian is at 0.
        $natPerms = [];
        $otherNats = ['Englishman', 'Spaniard', 'Ukrainian', 'Japanese'];
        foreach ($getPermutations($otherNats) as $p) {
            array_unshift($p, 'Norwegian');
            $natPerms[] = $p;
        }

        // Colors: Blue is at 1. Green is immediately right of Ivory.
        // Possible color arrangements satisfying "Green right of Ivory" and "Blue at 1":
        // Indices: 0, 1, 2, 3, 4
        // Blue is at 1.
        // Green/Ivory pairs can be at (2,3), (3,4). (0,1) impossible because 1 is Blue. (1,2) impossible.
        // So Ivory/Green can be (2,3) or (3,4).
        // Remaining colors: Red, Yellow.
        // Clue 2: Englishman in Red.
        // Clue 8: Yellow house is Painter.
        
        $colorPerms = [];
        $possibleColorOrders = [
            ['Yellow', 'Blue', 'Red', 'Ivory', 'Green'], // Ivory(3), Green(4)
            ['Yellow', 'Blue', 'Ivory', 'Green', 'Red'], // Ivory(2), Green(3) - Wait, Englishman in Red. If Red is 4, Englishman is 4.
            ['Red', 'Blue', 'Ivory', 'Green', 'Yellow'], // Invalid: Norwegian(0) != Englishman.
            // Let's generate systematically.
        ];
        
        // Systematic generation for colors with Blue at 1 and Green = Ivory + 1
        $baseColors = ['Red', 'Green', 'Ivory', 'Yellow']; // Blue is fixed at 1
        // We need to place Green and Ivory such that Green index = Ivory index + 1.
        // Available slots: 0, 2, 3, 4.
        // Pairs for (Ivory, Green): (2,3), (3,4). (0,1) invalid (1 is Blue). (1,2) invalid.
        
        $validColorPerms = [];
        
        // Case A: Ivory=2, Green=3. Slots left: 0, 4 for Red, Yellow.
        // Permutations of [Red, Yellow] for slots 0, 4.
        // 1. Red=0, Yellow=4 -> [Red, Blue, Ivory, Green, Yellow] -> Clue 2: Englishman in Red(0). But Norwegian is 0. Conflict.
        // 2. Yellow=0, Red=4 -> [Yellow, Blue, Ivory, Green, Red] -> Valid so far.
        $validColorPerms[] = ['Yellow', 'Blue', 'Ivory', 'Green', 'Red'];

        // Case B: Ivory=3, Green=4. Slots left: 0, 2 for Red, Yellow.
        // Permutations of [Red, Yellow] for slots 0, 2.
        // 1. Red=0, Yellow=2 -> [Red, Blue, Yellow, Ivory, Green] -> Conflict (Englishman vs Norwegian at 0).
        // 2. Yellow=0, Red=2 -> [Yellow, Blue, Red, Ivory, Green] -> Valid so far.
        $validColorPerms[] = ['Yellow', 'Blue', 'Red', 'Ivory', 'Green'];

        // So only two color permutations are possible initially.
        
        foreach ($natPerms as $nats) {
            foreach ($validColorPerms as $colors) {
                // Clue 2: Englishman in Red
                $englishIdx = array_search('Englishman', $nats);
                $redIdx = array_search('Red', $colors);
                if ($englishIdx !== $redIdx) continue;

                // Clue 8: Yellow house is Painter
                $yellowIdx = array_search('Yellow', $colors);
                
                // Now iterate Drinks
                // Clue 9: Milk in middle (2)
                $otherDrinks = ['Coffee', 'Tea', 'Orange Juice', 'Water'];
                $drinkPerms = $getPermutations($otherDrinks);
                
                foreach ($drinkPerms as $dp) {
                    $drinks = [$dp[0], $dp[1], 'Milk', $dp[2], $dp[3]];
                    
                    // Clue 4: Green house drinks Coffee
                    $greenIdx = array_search('Green', $colors);
                    if ($drinks[$greenIdx] !== 'Coffee') continue;

                    // Clue 5: Ukrainian drinks Tea
                    $ukrIdx = array_search('Ukrainian', $nats);
                    if ($drinks[$ukrIdx] !== 'Tea') continue;

                    // Now Hobbies
                    // Clue 8: Yellow house is Painter (already noted yellowIdx)
                    $otherHobbies = ['Dancing', 'Reading', 'Football', 'Chess'];
                    $hobbyPerms = $getPermutations($otherHobbies);

                    foreach ($hobbyPerms as $hp) {
                        $hobbies = [$hp[0], $hp[1], $hp[2], $hp[3], $hp[4]];
                        // Insert Painter at Yellow
                        // We need to construct the full array carefully. 
                        // Actually, let's just assign Painter to yellowIdx and permute the rest into remaining slots.
                        $hSlots = [0,1,2,3,4];
                        unset($hSlots[$yellowIdx]);
                        $hSlots = array_values($hSlots);
                        
                        $hFinal = array_fill(0, 5, '');
                        $hFinal[$yellowIdx] = 'Painter';
                        $hFinal[$hSlots[0]] = $hp[0];
                        $hFinal[$hSlots[1]] = $hp[1];
                        $hFinal[$hSlots[2]] = $hp[2];
                        $hFinal[$hSlots[3]] = $hp[3];
                        $hobbies = $hFinal;

                        // Clue 13: Football drinks Orange Juice
                        $footballIdx = array_search('Football', $hobbies);
                        if ($drinks[$footballIdx] !== 'Orange Juice') continue;

                        // Clue 14: Japanese plays Chess
                        $japIdx = array_search('Japanese', $nats);
                        if ($hobbies[$japIdx] !== 'Chess') continue;

                        // Now Pets
                        $otherPets = ['Dog', 'Snail', 'Fox', 'Horse', 'Zebra'];
                        $petPerms = $getPermutations($otherPets);

                        foreach ($petPerms as $pp) {
                            $pets = $pp;

                            // Clue 3: Spaniard owns Dog
                            $spanIdx = array_search('Spaniard', $nats);
                            if ($pets[$spanIdx] !== 'Dog') continue;

                            // Clue 7: Snail owner likes Dancing
                            $snailIdx = array_search('Snail', $pets);
                            if ($hobbies[$snailIdx] !== 'Dancing') continue;

                            // Clue 11: Reading next to Fox
                            $readingIdx = array_search('Reading', $hobbies);
                            $foxIdx = array_search('Fox', $pets);
                            if (abs($readingIdx - $foxIdx) !== 1) continue;

                            // Clue 12: Painter next to Horse
                            // Painter is at $yellowIdx
                            $horseIdx = array_search('Horse', $pets);
                            if (abs($yellowIdx - $horseIdx) !== 1) continue;

                            // If we reach here, we found the solution
                            $waterIdx = array_search('Water', $drinks);
                            $this->waterDrinker = $nats[$waterIdx];

                            $zebraIdx = array_search('Zebra', $pets);
                            $this->zebraOwner = $nats[$zebraIdx];

                            $this->solved = true;
                            return;
                        }
                    }
                }
            }
        }
    }
}