<?php

declare(strict_types=1);

// 1. Aquí dejas toda tu clase completa tal como la tienes
class Alphametics
{
    // ... todo el código de las variables, backtrack, quickCheck, etc.
    public function solve(string $puzzle): ?array { 
        // ... tu código actual
    }
}

// 2. FUERA de la clase, agregas esta función puente
function solve(string $puzzle): ?array
{
    $solver = new Alphametics();
    return $solver->solve($puzzle);
}
    
    private function getLetterWeight(string $letter): int
    {
        $weight = 0;
        foreach ($this->addends as $word) {
            $pos = strpos($word, $letter);
            if ($pos !== false) {
                $weight += (strlen($word) - $pos) * 10;
            }
        }
        $pos = strpos($this->result, $letter);
        if ($pos !== false) {
            $weight += (strlen($this->result) - $pos) * 10;
        }
        return $weight;
    }
    
    private function backtrack(array &$assignment, array &$used, int $index): bool
    {
        if ($index === count($this->letters)) {
            return $this->checkSolution($assignment);
        }
        
        $letter = $this->letters[$index];
        $start = isset($this->leading[$letter]) ? 1 : 0;
        
        // Try digits in a smart order (higher digits first for leading letters)
        $digits = range($start, 9);
        if (!isset($this->leading[$letter])) {
            // For non-leading letters, try middle digits first (better pruning)
            $digits = [5,6,4,7,3,8,2,9,1,0];
            $digits = array_values(array_filter($digits, fn($d) => $d >= $start));
        }
        
        foreach ($digits as $digit) {
            if (!$used[$digit]) {
                $assignment[$letter] = $digit;
                $used[$digit] = true;
                
                // Prune early if possible
                if ($this->quickCheck($assignment)) {
                    if ($this->backtrack($assignment, $used, $index + 1)) {
                        return true;
                    }
                }
                
                $used[$digit] = false;
                unset($assignment[$letter]);
            }
        }
        
        return false;
    }
    
    private function quickCheck(array $assignment): bool
    {
        // Check if any leading letter is assigned zero
        foreach ($this->leading as $letter => $_) {
            if (isset($assignment[$letter]) && $assignment[$letter] === 0) {
                return false;
            }
        }
        
        // Check if the last digit of the sum matches
        $lastColSum = 0;
        $lastColKnown = true;
        
        foreach ($this->addends as $word) {
            $lastChar = $word[strlen($word) - 1];
            if (isset($assignment[$lastChar])) {
                $lastColSum += $assignment[$lastChar];
            } else {
                $lastColKnown = false;
            }
        }
        
        $resultLastChar = $this->result[strlen($this->result) - 1];
        if ($lastColKnown && isset($assignment[$resultLastChar])) {
            if (($lastColSum % 10) !== $assignment[$resultLastChar]) {
                return false;
            }
        }
        
        return true;
    }
    
    private function checkSolution(array $assignment): bool
    {
        // Convert each addend to a number
        $sum = 0;
        foreach ($this->addends as $term) {
            $num = 0;
            for ($i = 0; $i < strlen($term); $i++) {
                $num = $num * 10 + $assignment[$term[$i]];
            }
            $sum += $num;
        }
        
        // Convert result to a number
        $target = 0;
        for ($i = 0; $i < strlen($this->result); $i++) {
            $target = $target * 10 + $assignment[$this->result[$i]];
        }
        
        return $sum === $target;
    }
}