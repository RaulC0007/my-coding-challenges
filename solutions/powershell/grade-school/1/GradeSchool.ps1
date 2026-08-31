class Student {
    [string]$Name
    [int]$Grade

    Student([string]$name, [int]$grade) {
        $this.Name = $name
        $this.Grade = $grade
    }
}

class Roster {
    hidden [System.Collections.Generic.Dictionary[string, int]] $_students

    Roster() {
        $this._students = [System.Collections.Generic.Dictionary[string, int]]::new()
    }

    [bool] AddStudent([int]$grade, [string]$name) {
        if ($this._students.ContainsKey($name)) {
            return $false
        }
        $this._students[$name] = $grade
        return $true
    }

    [Student[]] GetRoster() {
        return $this.GetRoster($null)
    }

    [Student[]] GetRoster([Nullable[int]]$grade) {
        $result = [System.Collections.Generic.List[Student]]::new()

        if ($null -ne $grade) {
            foreach ($name in ($this._students.Keys | Sort-Object)) {
                if ($this._students[$name] -eq $grade) {
                    $result.Add([Student]::new($name, $this._students[$name]))
                }
            }
            return $result.ToArray()
        }

        foreach ($name in ($this._students.Keys | Sort-Object)) {
            $result.Add([Student]::new($name, $this._students[$name]))
        }

        $sorted = $result | Sort-Object Grade, Name
        return @($sorted)
    }
}