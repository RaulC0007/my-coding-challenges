<?php

declare(strict_types=1);

class Tournament
{
    private const WIN  = 'win';
    private const LOSS = 'loss';
    private const DRAW = 'draw';

    public function tally(string $input): string
    {
        if (trim($input) === '') {
            return $this->header();
        }

        $teams = [];

        foreach (explode("\n", $input) as $line) {
            $line = trim($line);
            if ($line === '') continue;

            [$team1, $team2, $result] = explode(';', $line);

            // Initialize teams if not seen yet
            $teams[$team1] ??= $this->newTeam($team1);
            $teams[$team2] ??= $this->newTeam($team2);

            // Update stats
            match ($result) {
                self::WIN  => $this->recordWin($teams[$team1], $teams[$team2]),
                self::LOSS => $this->recordWin($teams[$team2], $teams[$team1]),
                self::DRAW => $this->recordDraw($teams[$team1], $teams[$team2]),
                default    => null,
            };
        }

        // Sort: by points descending, then by name ascending
        uasort($teams, function ($a, $b) {
            if ($b['points'] !== $a['points']) {
                return $b['points'] <=> $a['points'];
            }
            return $a['name'] <=> $b['name'];
        });

        // Build output
        $lines = [$this->header()];
        foreach ($teams as $team) {
            $lines[] = sprintf(
                "%-30s | %2d | %2d | %2d | %2d | %2d",
                $team['name'],
                $team['mp'],
                $team['w'],
                $team['d'],
                $team['l'],
                $team['points']
            );
        }

        return implode("\n", $lines);
    }

    private function header(): string
    {
        return "Team                           | MP |  W |  D |  L |  P";
    }

    private function newTeam(string $name): array
    {
        return [
            'name'   => $name,
            'mp'     => 0,
            'w'      => 0,
            'd'      => 0,
            'l'      => 0,
            'points' => 0,
        ];
    }

    private function recordWin(array &$winner, array &$loser): void
    {
        $winner['mp']++;
        $winner['w']++;
        $winner['points'] += 3;

        $loser['mp']++;
        $loser['l']++;
    }

    private function recordDraw(array &$t1, array &$t2): void
    {
        $t1['mp']++;
        $t1['d']++;
        $t1['points'] += 1;

        $t2['mp']++;
        $t2['d']++;
        $t2['points'] += 1;
    }
}