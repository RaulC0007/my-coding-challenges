<?php

declare(strict_types=1);

class Bob
{
    public function respondTo(string $str): string
    {
        // Remove whitespace and check for silence
        $trimmed = trim($str);
        
        if (empty($trimmed)) {
            return "Fine. Be that way!";
        }
        
        // Check if it's yelling (all uppercase and has letters)
        $isYelling = $this->isYelling($trimmed);
        
        // Check if it's a question (ends with question mark)
        $isQuestion = substr($trimmed, -1) === '?';
        
        if ($isYelling && $isQuestion) {
            return "Calm down, I know what I'm doing!";
        }
        
        if ($isYelling) {
            return "Whoa, chill out!";
        }
        
        if ($isQuestion) {
            return "Sure.";
        }
        
        return "Whatever.";
    }
    
    private function isYelling(string $str): bool
    {
        // Check if string contains letters and all letters are uppercase
        $hasLetters = preg_match('/[a-zA-Z]/', $str);
        $isAllUppercase = $str === strtoupper($str);
        
        return $hasLetters && $isAllUppercase;
    }
}