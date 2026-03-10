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

class CircularBuffer
{
    private array $buffer;
    private int $capacity;
    private int $readIndex;
    private int $writeIndex;
    private int $count;

    public function __construct(int $capacity)
    {
        $this->capacity = $capacity;
        $this->buffer = array_fill(0, $capacity, null);
        $this->readIndex = 0;
        $this->writeIndex = 0;
        $this->count = 0;
    }

    public function read()
    {
        if ($this->count === 0) {
            throw new BufferEmptyError("Cannot read from empty buffer");
        }

        $value = $this->buffer[$this->readIndex];
        $this->readIndex = ($this->readIndex + 1) % $this->capacity;
        $this->count--;

        return $value;
    }

    public function write($item): void
    {
        if ($this->count === $this->capacity) {
            throw new BufferFullError("Cannot write to full buffer");
        }

        $this->buffer[$this->writeIndex] = $item;
        $this->writeIndex = ($this->writeIndex + 1) % $this->capacity;
        $this->count++;
    }

    public function forceWrite($item): void
    {
        if ($this->count === $this->capacity) {
            // Buffer is full, overwrite the oldest element
            $this->buffer[$this->writeIndex] = $item;
            $this->writeIndex = ($this->writeIndex + 1) % $this->capacity;
            $this->readIndex = ($this->readIndex + 1) % $this->capacity;
            // count remains the same
        } else {
            // Buffer has space, just write normally
            $this->write($item);
        }
    }

    public function clear(): void
    {
        $this->readIndex = 0;
        $this->writeIndex = 0;
        $this->count = 0;
        $this->buffer = array_fill(0, $this->capacity, null);
    }
}

class BufferFullError extends Exception
{
}

class BufferEmptyError extends Exception
{
}