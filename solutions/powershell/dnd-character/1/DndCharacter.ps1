Class Character {
    [int]$Strength
    [int]$Dexterity
    [int]$Constitution
    [int]$Intelligence
    [int]$Wisdom
    [int]$Charisma
    [int]$HitPoints

    Character() {
        $this.Strength     = $this.Ability()
        $this.Dexterity    = $this.Ability()
        $this.Constitution = $this.Ability()
        $this.Intelligence = $this.Ability()
        $this.Wisdom       = $this.Ability()
        $this.Charisma     = $this.Ability()
        $this.HitPoints    = 10 + [Character]::GetModifier($this.Constitution)
    }

    [int] Ability() {
        $rolls = 1..4 | ForEach-Object { Get-Random -Minimum 1 -Maximum 7 }
        $sorted = $rolls | Sort-Object
        return ($sorted[1] + $sorted[2] + $sorted[3])
    }

    static [int] GetModifier([int]$Score) {
        return [int][math]::Floor(($Score - 10) / 2.0)
    }
}