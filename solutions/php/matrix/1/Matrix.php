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

class Matrix
{
    private array $rows;

    public function __construct(string $matrix)
    {
        // Split the matrix string by newlines
        $lines = explode("\n", $matrix);
        
        // Process each line to extract numbers
        $this->rows = [];
        foreach ($lines as $line) {
            // Trim whitespace and split by whitespace
            $trimmedLine = trim($line);
            if ($trimmedLine === '') {
                continue; // Skip empty lines
            }
            
            $numbers = array_map('trim', explode(' ', $trimmedLine));
            $row = [];
            foreach ($numbers as $number) {
                if ($number !== '') {
                    $row[] = (int)$number;
                }
            }
            
            $this->rows[] = $row;
        }
        
        // Validate that all rows have the same length
        if (!empty($this->rows)) {
            $firstRowLength = count($this->rows[0]);
            foreach ($this->rows as $row) {
                if (count($row) !== $firstRowLength) {
                    throw new InvalidArgumentException("All rows must have the same number of columns");
                }
            }
        }
    }

    public function getRow(int $rowId): array
    {
        // Convert to 0-based index
        $index = $rowId - 1;
        
        // Check if row exists
        if ($index < 0 || $index >= count($this->rows)) {
            throw new InvalidArgumentException("Row ID out of bounds");
        }
        
        return $this->rows[$index];
    }

    public function getColumn(int $columnId): array
    {
        // Convert to 0-based index
        $index = $columnId - 1;
        
        // Check if column exists
        if ($index < 0 || $index >= count($this->rows[0])) {
            throw new InvalidArgumentException("Column ID out of bounds");
        }
        
        $column = [];
        foreach ($this->rows as $row) {
            $column[] = $row[$index];
        }
        
        return $column;
    }
}

