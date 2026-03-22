<?php

class AnnalynsInfiltration
{
    public function canFastAttack($is_knight_awake)
    {
        // Fast attack can be made if the knight is sleeping
        return !$is_knight_awake;
    }

    public function canSpy($is_knight_awake, $is_archer_awake, $is_prisoner_awake)
    {
        // The group can be spied upon if at least one of them is awake
        return $is_knight_awake || $is_archer_awake || $is_prisoner_awake;
    }

    public function canSignal($is_archer_awake, $is_prisoner_awake)
    {
        // The prisoner can be signalled if the prisoner is awake and the archer is sleeping
        return $is_prisoner_awake && !$is_archer_awake;
    }

    public function canLiberate($is_knight_awake, $is_archer_awake, $is_prisoner_awake, $is_dog_present)
    {
        if ($is_dog_present) {
            // If Annalyn has her dog, she can rescue if the archer is asleep
            return !$is_archer_awake;
        } else {
            // If Annalyn doesn't have her dog, she can free the prisoner if:
            // - The prisoner is awake
            // - The knight and archer are both sleeping
            return $is_prisoner_awake && !$is_knight_awake && !$is_archer_awake;
        }
    }
}