<?php
declare(strict_types=1);

class ProteinTranslation
{
    private const CODON_TO_PROTEIN = [
        'AUG' => 'Methionine',
        'UUU' => 'Phenylalanine',
        'UUC' => 'Phenylalanine',
        'UUA' => 'Leucine',
        'UUG' => 'Leucine',
        'UCU' => 'Serine',
        'UCC' => 'Serine',
        'UCA' => 'Serine',
        'UCG' => 'Serine',
        'UAU' => 'Tyrosine',
        'UAC' => 'Tyrosine',
        'UGU' => 'Cysteine',
        'UGC' => 'Cysteine',
        'UGG' => 'Tryptophan',
        'UAA' => 'STOP',
        'UAG' => 'STOP',
        'UGA' => 'STOP',
    ];

    public function getProteins(string $rna): array
    {
        $proteins = [];
        
        for ($i = 0; $i < strlen($rna); $i += 3) {
            $codon = substr($rna, $i, 3);
            
            if (!isset(self::CODON_TO_PROTEIN[$codon])) {
                throw new \InvalidArgumentException("Invalid codon: $codon");
            }
            
            $protein = self::CODON_TO_PROTEIN[$codon];
            if ($protein === 'STOP') {
                break;
            }
            
            $proteins[] = $protein;
        }
        
        return $proteins;
    }
}
?>