<?php
declare(strict_types=1);

class Strain
{
    public function keep(array $list, callable $predicate): array
    {
        $result = [];
        foreach ($list as $item) {
            if ($predicate($item)) {
                $result[] = $item;
            }
        }
        return $result;
    }

    public function discard(array $list, callable $predicate): array
    {
        $result = [];
        foreach ($list as $item) {
            if (!$predicate($item)) {
                $result[] = $item;
            }
        }
        return $result;
    }
}
?>


