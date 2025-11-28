<?php
declare(strict_types=1);

function from(DateTimeImmutable $date): DateTimeImmutable
{
    // one gigasecond = 1 000 000 000 seconds
    return $date->add(new DateInterval('PT1000000000S'));
}