enum Category {
    Ones
    Twos
    Threes
    Fours
    Fives
    Sixes
    FullHouse
    FourOfAKind
    LittleStraight
    BigStraight
    Choice
    Yacht
}

function Get-Score() {
    [CmdletBinding()]
    Param(
        [int[]]$Dice,
        [Parameter(Mandatory)]
        [string]$Category
    )

    # Normalizar la categoría recibida para que coincida con el enum (removiendo guiones bajos y convirtiendo a formato adecuado)
    $normalizedCategory = (Get-Culture).TextInfo.ToTitleCase($Category.ToLower().Replace('_', ' ')) -replace '\s+', ''

    # Pre-calculate common metrics to keep the switch statement clean
    $groups = $Dice | Group-Object
    $counts = ($groups | ForEach-Object { $_.Count }) | Sort-Object
    $sum = ($Dice | Measure-Object -Sum).Sum
    $sortedDice = ($Dice | Sort-Object) -join ''

    switch ($normalizedCategory) {
        'Ones'   { return ($Dice | Where-Object { $_ -eq 1 } | Measure-Object -Sum).Sum }
        'Twos'   { return ($Dice | Where-Object { $_ -eq 2 } | Measure-Object -Sum).Sum }
        'Threes' { return ($Dice | Where-Object { $_ -eq 3 } | Measure-Object -Sum).Sum }
        'Fours'  { return ($Dice | Where-Object { $_ -eq 4 } | Measure-Object -Sum).Sum }
        'Fives'  { return ($Dice | Where-Object { $_ -eq 5 } | Measure-Object -Sum).Sum }
        'Sixes'  { return ($Dice | Where-Object { $_ -eq 6 } | Measure-Object -Sum).Sum }

        'FullHouse' {
            if (($counts -join '') -eq '23') { 
                return $sum 
            }
            return 0
        }

        'FourOfAKind' {
            $group = $groups | Where-Object { $_.Count -ge 4 }
            if ($group) { 
                return [int]$group.Name * 4 
            }
            return 0
        }

        'LittleStraight' {
            if ($sortedDice -eq '12345') { return 30 }
            return 0
        }

        'BigStraight' {
            if ($sortedDice -eq '23456') { return 30 }
            return 0
        }

        'Choice' {
            return $sum
        }

        'Yacht' {
            if (($Dice | Select-Object -Unique).Count -eq 1) { 
                return 50 
            }
            return 0
        }
        
        default {
            throw "Unknown category: $Category"
        }
    }
}