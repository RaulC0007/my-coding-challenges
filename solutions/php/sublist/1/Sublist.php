<?php
declare(strict_types=1);

class Sublist
{
    public function compare(array $listOne, array $listTwo): string
    {
        if ($listOne === $listTwo) {
            return 'EQUAL';
        }
        
        if ($this->isSublist($listOne, $listTwo)) {
            return 'SUBLIST';
        }
        
        if ($this->isSublist($listTwo, $listOne)) {
            return 'SUPERLIST';
        }
        
        return 'UNEQUAL';
    }
    
    private function isSublist(array $sublist, array $list): bool
    {
        $subLen = count($sublist);
        $listLen = count($list);
        
        if ($subLen === 0) {
            return true; // empty list is sublist of any list
        }
        
        for ($i = 0; $i <= $listLen - $subLen; $i++) {
            if (array_slice($list, $i, $subLen) === $sublist) {
                return true;
            }
        }
        
        return false;
    }
}
?>