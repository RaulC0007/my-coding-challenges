<?php

class HighSchoolSweetheart
{
    public function firstLetter(string $name): string
    {
        $name = trim($name);
        return $name[0];
    }

    public function initial(string $name): string
    {
        $firstLetter = $this->firstLetter($name);
        return strtoupper($firstLetter) . '.';
    }

    public function initials(string $name): string
    {
        $nameParts = explode(' ', $name);
        $firstName = $nameParts[0];
        $lastName = $nameParts[1];
        
        $firstInitial = $this->initial($firstName);
        $lastInitial = $this->initial($lastName);
        
        return $firstInitial . ' ' . $lastInitial;
    }

    public function pair(string $sweetheart_a, string $sweetheart_b): string
    {
        $initials_a = $this->initials($sweetheart_a);
        $initials_b = $this->initials($sweetheart_b);
        
        return "     ******       ******\n" .
               "   **      **   **      **\n" .
               " **         ** **         **\n" .
               "**            *            **\n" .
               "**                         **\n" .
               "**     $initials_a  +  $initials_b     **\n" .
               " **                       **\n" .
               "   **                   **\n" .
               "     **               **\n" .
               "       **           **\n" .
               "         **       **\n" .
               "           **   **\n" .
               "             ***\n" .
               "              *";
    }
}
