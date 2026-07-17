<?php

declare(strict_types=1);

class SwiftScheduling
{
    private DateTime $meetingStart;

    public function __construct(DateTime $meetingStart)
    {
        $this->meetingStart = $meetingStart;
    }

    private function isWorkday(DateTime $date): bool
    {
        $dayOfWeek = (int)$date->format('N');
        return $dayOfWeek >= 1 && $dayOfWeek <= 5;
    }

    private function getFirstWorkdayOfMonth(int $year, int $month): DateTime
    {
        $date = new DateTime("$year-$month-01");
        while (!$this->isWorkday($date)) {
            $date->modify('+1 day');
        }
        return $date;
    }

    private function getLastWorkdayOfMonth(int $year, int $month): DateTime
    {
        $date = new DateTime("$year-$month-01");
        $date->modify('last day of this month');
        while (!$this->isWorkday($date)) {
            $date->modify('-1 day');
        }
        return $date;
    }

    private function getFirstWorkdayOfYearMonth(int $month, int $yearOffset = 0): DateTime
    {
        $year = (int)$this->meetingStart->format('Y') + $yearOffset;
        $date = $this->getFirstWorkdayOfMonth($year, $month);
        $date->setTime(8, 0, 0);
        return $date;
    }

    private function getLastWorkdayOfYearQuarter(int $quarter, int $yearOffset = 0): DateTime
    {
        $year = (int)$this->meetingStart->format('Y') + $yearOffset;
        $lastMonthOfQuarter = $quarter * 3;
        $date = $this->getLastWorkdayOfMonth($year, $lastMonthOfQuarter);
        $date->setTime(8, 0, 0);
        return $date;
    }

    private function parseVariableDelivery(string $description): DateTime
    {
        // Pattern: "<N>M" (N-th month)
        if (preg_match('/^(\d+)M$/', $description, $matches)) {
            $month = (int)$matches[1];
            if ($month < 1 || $month > 12) {
                throw new InvalidArgumentException("Invalid month: $month");
            }
            
            $currentMonth = (int)$this->meetingStart->format('n');
            $yearOffset = ($month <= $currentMonth) ? 1 : 0;
            
            return $this->getFirstWorkdayOfYearMonth($month, $yearOffset);
        }
        
        // Pattern: "Q<N>" (N-th quarter)
        if (preg_match('/^Q(\d+)$/', $description, $matches)) {
            $quarter = (int)$matches[1];
            if ($quarter < 1 || $quarter > 4) {
                throw new InvalidArgumentException("Invalid quarter: $quarter");
            }
            
            $currentQuarter = (int)ceil((int)$this->meetingStart->format('n') / 3);
            $yearOffset = ($quarter < $currentQuarter) ? 1 : 0;
            
            return $this->getLastWorkdayOfYearQuarter($quarter, $yearOffset);
        }
        
        throw new InvalidArgumentException("Invalid variable description: $description");
    }

    private function parseFixedDelivery(string $description): DateTime
    {
        $hour = (int)$this->meetingStart->format('H');
        $date = clone $this->meetingStart;
        
        switch ($description) {
            case 'NOW':
                $date->modify('+2 hours');
                return $date;
                
            case 'ASAP':
                if ($hour < 13) {
                    $date->setTime(17, 0, 0);
                } else {
                    $date->modify('+1 day');
                    $date->setTime(13, 0, 0);
                }
                return $date;
                
            case 'EOW':
                $dayOfWeek = (int)$date->format('N');
                if ($dayOfWeek <= 3) { // Monday, Tuesday, Wednesday
                    $date->modify('Friday this week');
                    $date->setTime(17, 0, 0);
                } else { // Thursday, Friday
                    $date->modify('Sunday this week');
                    $date->setTime(20, 0, 0);
                }
                return $date;
                
            default:
                throw new InvalidArgumentException("Invalid fixed description: $description");
        }
    }

    public function deliveryDate(string $description): DateTime
    {
        // Check if it's a fixed description
        $fixedDescriptions = ['NOW', 'ASAP', 'EOW'];
        if (in_array($description, $fixedDescriptions)) {
            return $this->parseFixedDelivery($description);
        }
        
        // Check if it's a variable description
        if (preg_match('/^(\d+)M$/', $description) || preg_match('/^Q(\d+)$/', $description)) {
            return $this->parseVariableDelivery($description);
        }
        
        throw new InvalidArgumentException("Invalid description: $description");
    }
}