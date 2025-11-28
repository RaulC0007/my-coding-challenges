<?php

class ProgramWindow
{
    public $y;
    public $x;
    public $height;
    public $width;

    public function __construct()
    {
        $this->y = 0;
        $this->x = 0;
        $this->height = 600;
        $this->width = 800;
    }

    public function resize($size)
    {
        if ($size->width <= 0 || $size->height <= 0) {
            return; // Don't resize if the new size is not positive
        }
        
        $this->width = $size->width;
        $this->height = $size->height;
    }

    public function move($position)
    {
        $this->x = $position->x;
        $this->y = $position->y;
    }
}