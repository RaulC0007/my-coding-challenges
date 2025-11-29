<?php

declare(strict_types=1);

function toRna(string $dna): string
{
    $transcription = [
        'G' => 'C',
        'C' => 'G', 
        'T' => 'A',
        'A' => 'U'
    ];
    
    $rna = '';
    
    for ($i = 0; $i < strlen($dna); $i++) {
        $nucleotide = $dna[$i];
        
        if (!isset($transcription[$nucleotide])) {
            throw new InvalidArgumentException('Invalid DNA nucleotide: ' . $nucleotide);
        }
        
        $rna .= $transcription[$nucleotide];
    }
    
    return $rna;
}