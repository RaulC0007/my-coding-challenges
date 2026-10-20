<?php

declare(strict_types=1);

class Result
{
    public function __construct(
        public readonly Location $start,
        public readonly Location $end
    ) {
    }
}