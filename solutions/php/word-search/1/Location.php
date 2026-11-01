<?php

declare(strict_types=1);

class Location
{
    public function __construct(
        public readonly int $column,
        public readonly int $row
    ) {
    }
}