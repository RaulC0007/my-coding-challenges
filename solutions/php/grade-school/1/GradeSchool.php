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

class GradeSchool
{
    private array $studentsByGrade = [];
    private array $allStudents = [];

    public function add(string $name, int $grade): bool
    {
        // Check if student already exists in any grade
        if (isset($this->allStudents[$name])) {
            return false; // Student already exists
        }

        // Add student to the specified grade
        if (!isset($this->studentsByGrade[$grade])) {
            $this->studentsByGrade[$grade] = [];
        }
        
        $this->studentsByGrade[$grade][] = $name;
        $this->allStudents[$name] = $grade;
        
        // Keep the students in each grade sorted alphabetically
        sort($this->studentsByGrade[$grade]);
        
        return true;
    }

    public function grade(int $grade): array
    {
        if (!isset($this->studentsByGrade[$grade])) {
            return [];
        }
        
        return $this->studentsByGrade[$grade];
    }

    public function roster(): array
    {
        $roster = [];
        
        // Sort grades in ascending order
        $sortedGrades = array_keys($this->studentsByGrade);
        sort($sortedGrades);
        
        // Add students from each grade to the roster in grade order
        foreach ($sortedGrades as $grade) {
            foreach ($this->studentsByGrade[$grade] as $student) {
                $roster[] = $student;
            }
        }
        
        return $roster;
    }
}