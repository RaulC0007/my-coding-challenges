<?php
declare(strict_types=1);

class Poker
{
    public array $bestHands;

    public function __construct(array $hands)
    {
        $scored = array_map(fn($h) => ['hand' => $h, 'score' => $this->scoreHand($h)], $hands);
        usort($scored, fn($a, $b) => $this->compareScores($b['score'], $a['score']));

        $topScore = $scored[0]['score'];
        $this->bestHands = array_column(
            array_filter($scored, fn($e) => $this->scoresEqual($e['score'], $topScore)),
            'hand'
        );
    }

    private function compareScores(array $a, array $b): int
    {
        for ($i = 0; $i < count($a); $i++) {
            if ($a[$i] !== $b[$i]) {
                return $a[$i] <=> $b[$i];
            }
        }
        return 0;
    }

    private function scoresEqual(array $a, array $b): bool
    {
        return $this->compareScores($a, $b) === 0;
    }

    private function scoreHand(string $hand): array
    {
        $cards = $this->parseCards($hand);
        $values = array_column($cards, 'r');
        $suits = array_column($cards, 's');

        $valueCnt = array_count_values($values);
        arsort($valueCnt);
        $counts = array_values($valueCnt);
        $ranks = array_keys($valueCnt); // descending by frequency

        $flush = count(array_unique($suits)) === 1;
        $straight = $this->isStraight($values);

        // Straight flush / Royal flush (score 8)
        if ($straight && $flush) return [8, ...$this->straightTop($values)];
        // Four of a kind
        if ($counts === [4,1]) return [7, $ranks[0], $ranks[1]];
        // Full house
        if ($counts === [3,2]) return [6, $ranks[0], $ranks[1]];
        // Flush
        if ($flush) return [5, ...$this->sortedRanks($values)];
        // Straight
        if ($straight) return [4, ...$this->straightTop($values)];
        // Three of a kind
        if ($counts === [3,1,1]) return [3, $ranks[0], ...$this->sortedRanks(array_slice($ranks,1))];
        // Two pair
        if ($counts === [2,2,1]) {
            $pairValues = [$ranks[0], $ranks[1]];
            rsort($pairValues);
            return [2, ...$pairValues, $ranks[2]];
        }
        // One pair
        if ($counts === [2,1,1,1]) return [1, $ranks[0], ...$this->sortedRanks(array_slice($ranks,1))];
        // High card
        return [0, ...$this->sortedRanks($values)];
    }

    private function parseCards(string $hand): array
    {
        $hand = str_replace(',', ' ', $hand);
        $cards = preg_split('/\s+/', trim($hand));
        $out = [];
        
        foreach ($cards as $card) {
            if (strlen($card) < 2) continue;
            
            $value = substr($card, 0, -1);
            $suit = substr($card, -1);
            
            $map = ['T'=>10, 'J'=>11, 'Q'=>12, 'K'=>13, 'A'=>14];
            $rank = $map[$value] ?? (int)$value;
            
            $out[] = ['r' => $rank, 's' => $suit];
        }
        
        return $out;
    }

    private function isStraight(array $values): bool
    {
        $unique = array_unique($values);
        if (count($unique) !== 5) return false;
        
        $ranks = $values;
        sort($ranks);
        
        // Check for wheel (A-2-3-4-5)
        if ($ranks === [2, 3, 4, 5, 14]) return true;
        
        // Check for regular straight
        for ($i = 1; $i < 5; $i++) {
            if ($ranks[$i] - $ranks[$i-1] !== 1) return false;
        }
        
        return true;
    }

    private function straightTop(array $values): array
    {
        $ranks = $values;
        sort($ranks);
        
        // Wheel (A-2-3-4-5) tops at 5
        if ($ranks === [2, 3, 4, 5, 14]) {
            return [5];
        }
        
        return [$ranks[4]]; // Highest card
    }

    private function sortedRanks(array $values): array
    {
        $ranks = $values;
        rsort($ranks);
        return $ranks;
    }
}