<?php

declare(strict_types=1);

class Node
{
    public int $value;
    public ?Node $next = null;
    public ?Node $prev = null;

    public function __construct(int $value)
    {
        $this->value = $value;
    }
}

class LinkedList
{
    private ?Node $head = null;
    private ?Node $tail = null;
    private int $size = 0;

    public function count(): int
    {
        return $this->size;
    }

    public function isEmpty(): bool
    {
        return $this->size === 0;
    }

    public function push(int $value): void
    {
        $newNode = new Node($value);

        if ($this->isEmpty()) {
            $this->head = $this->tail = $newNode;
        } else {
            $newNode->prev = $this->tail;
            $this->tail->next = $newNode;
            $this->tail = $newNode;
        }

        $this->size++;
    }

    public function unshift(int $value): void
    {
        $newNode = new Node($value);

        if ($this->isEmpty()) {
            $this->head = $this->tail = $newNode;
        } else {
            $newNode->next = $this->head;
            $this->head->prev = $newNode;
            $this->head = $newNode;
        }

        $this->size++;
    }

    public function pop(): int
    {
        if ($this->isEmpty()) {
            throw new \RuntimeException('List is empty');
        }

        $value = $this->tail->value;
        $this->tail = $this->tail->prev;

        if ($this->tail === null) {
            $this->head = null;
        } else {
            $this->tail->next = null;
        }

        $this->size--;
        return $value;
    }

    public function shift(): int
    {
        if ($this->isEmpty()) {
            throw new \RuntimeException('List is empty');
        }

        $value = $this->head->value;
        $this->head = $this->head->next;

        if ($this->head === null) {
            $this->tail = null;
        } else {
            $this->head->prev = null;
        }

        $this->size--;
        return $value;
    }

    public function delete(int $value): void
    {
        if ($this->isEmpty()) {
            return;
        }

        $current = $this->head;

        while ($current !== null) {
            if ($current->value === $value) {
                // Case 1: Only one node
                if ($current === $this->head && $current === $this->tail) {
                    $this->head = $this->tail = null;
                }
                // Case 2: Delete head
                elseif ($current === $this->head) {
                    $this->head = $current->next;
                    if ($this->head !== null) {
                        $this->head->prev = null;
                    }
                }
                // Case 3: Delete tail
                elseif ($current === $this->tail) {
                    $this->tail = $current->prev;
                    if ($this->tail !== null) {
                        $this->tail->next = null;
                    }
                }
                // Case 4: Delete middle node
                else {
                    $current->prev->next = $current->next;
                    $current->next->prev = $current->prev;
                }

                $this->size--;
                return; // Remove only first occurrence
            }

            $current = $current->next;
        }
    }
}