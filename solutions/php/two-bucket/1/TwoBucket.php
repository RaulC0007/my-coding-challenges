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

class TwoBucket
{
    public int $numberOfActions;
    public string $nameOfBucketWithDesiredLiters;
    public int $litersLeftInOtherBucket;
    
    public function solve(int $sizeBucketOne, int $sizeBucketTwo, int $goal, string $startBucket)
    {
        // Check if goal is achievable
        if ($goal > max($sizeBucketOne, $sizeBucketTwo)) {
            throw new Exception("Goal is impossible to reach");
        }
        
        // BFS to find minimum moves
        $queue = [];
        $visited = [];
        
        // Initial state: fill the starting bucket (counts as 1 move)
        if ($startBucket === 'one') {
            $initialState = [$sizeBucketOne, 0, 1]; // bucket1, bucket2, moves
        } else {
            $initialState = [0, $sizeBucketTwo, 1]; // bucket1, bucket2, moves
        }
        
        // Check if initial state already meets goal
        if ($initialState[0] === $goal) {
            $this->numberOfActions = $initialState[2];
            $this->nameOfBucketWithDesiredLiters = 'one';
            $this->litersLeftInOtherBucket = $initialState[1];
            return $this;
        }
        
        if ($initialState[1] === $goal) {
            $this->numberOfActions = $initialState[2];
            $this->nameOfBucketWithDesiredLiters = 'two';
            $this->litersLeftInOtherBucket = $initialState[0];
            return $this;
        }
        
        $queue[] = $initialState;
        $visited[$initialState[0] . ',' . $initialState[1]] = true;
        
        while (!empty($queue)) {
            $current = array_shift($queue);
            [$b1, $b2, $moves] = $current;
            
            // Generate all possible next states
            $nextStates = $this->getNextStates($b1, $b2, $sizeBucketOne, $sizeBucketTwo, $startBucket);
            
            foreach ($nextStates as $state) {
                [$nb1, $nb2] = $state;
                $key = $nb1 . ',' . $nb2;
                
                // Skip if already visited
                if (isset($visited[$key])) {
                    continue;
                }
                
                // Check if this state meets the goal
                if ($nb1 === $goal) {
                    $this->numberOfActions = $moves + 1;
                    $this->nameOfBucketWithDesiredLiters = 'one';
                    $this->litersLeftInOtherBucket = $nb2;
                    return $this;
                }
                
                if ($nb2 === $goal) {
                    $this->numberOfActions = $moves + 1;
                    $this->nameOfBucketWithDesiredLiters = 'two';
                    $this->litersLeftInOtherBucket = $nb1;
                    return $this;
                }
                
                $visited[$key] = true;
                $queue[] = [$nb1, $nb2, $moves + 1];
            }
        }
        
        throw new Exception("Goal is impossible to reach");
    }
    
    private function getNextStates(int $b1, int $b2, int $size1, int $size2, string $startBucket): array
    {
        $states = [];
        
        // 1. Fill bucket 1
        if ($b1 < $size1) {
            $states[] = [$size1, $b2];
        }
        
        // 2. Fill bucket 2
        if ($b2 < $size2) {
            $states[] = [$b1, $size2];
        }
        
        // 3. Empty bucket 1
        if ($b1 > 0) {
            $states[] = [0, $b2];
        }
        
        // 4. Empty bucket 2
        if ($b2 > 0) {
            $states[] = [$b1, 0];
        }
        
        // 5. Pour from bucket 1 to bucket 2
        if ($b1 > 0 && $b2 < $size2) {
            $amount = min($b1, $size2 - $b2);
            $states[] = [$b1 - $amount, $b2 + $amount];
        }
        
        // 6. Pour from bucket 2 to bucket 1
        if ($b2 > 0 && $b1 < $size1) {
            $amount = min($b2, $size1 - $b1);
            $states[] = [$b1 + $amount, $b2 - $amount];
        }
        
        // Filter out forbidden states (starting bucket empty, other bucket full)
        $filtered = [];
        foreach ($states as $state) {
            [$nb1, $nb2] = $state;
            
            if ($startBucket === 'one') {
                // Cannot have bucket1 empty and bucket2 full
                if ($nb1 === 0 && $nb2 === $size2) {
                    continue;
                }
            } else {
                // Cannot have bucket2 empty and bucket1 full
                if ($nb2 === 0 && $nb1 === $size1) {
                    continue;
                }
            }
            
            $filtered[] = $state;
        }
        
        return $filtered;
    }
}