<?php

declare(strict_types=1);

class BankAccount
{
    private ?int $balance = null;
    private bool $isOpen = false;

    public function open(): void
    {
        if ($this->isOpen) {
            throw new Exception("account already open");
        }
        
        $this->balance = 0;
        $this->isOpen = true;
    }

    public function close(): void
    {
        if (!$this->isOpen) {
            throw new Exception("account not open");
        }
        
        $this->balance = null;
        $this->isOpen = false;
    }

    public function balance(): int
    {
        if (!$this->isOpen) {
            throw new Exception("account not open");
        }
        
        return $this->balance;
    }

    public function deposit(int $amt): void
    {
        if (!$this->isOpen) {
            throw new Exception("account not open");
        }
        
        if ($amt <= 0) {
            throw new InvalidArgumentException("amount must be greater than 0");
        }
        
        $this->balance += $amt;
    }

    public function withdraw(int $amt): void
    {
        if (!$this->isOpen) {
            throw new Exception("account not open");
        }
        
        if ($amt <= 0) {
            throw new InvalidArgumentException("amount must be greater than 0");
        }
        
        if ($amt > $this->balance) {
            throw new InvalidArgumentException("amount must be less than balance");
        }
        
        $this->balance -= $amt;
    }
}