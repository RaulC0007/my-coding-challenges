Function Invoke-PigLatin() {
    <#
    .SYNOPSIS
    Implement a program that translates from English to Pig Latin.
    #>
    [CmdletBinding()]
    Param(
        [Parameter(ValueFromPipeline = $true)]
        [string]$Text
    )

    if ([string]::IsNullOrWhiteSpace($Text)) {
        return ""
    }

    $words = $Text.Split([System.Char[]]@(' '), [System.StringSplitOptions]::RemoveEmptyEntries)
    $translatedWords = foreach ($word in $words) {
        Translate-Word $word
    }

    return $translatedWords -join " "
}

Function Translate-Word($word) {
    # Regla 1: Empieza con vocal, o con "xr" o "yt"
    if ($word -match '^(?:[aeiou]|xr|yt)') {
        return $word + 'ay'
    }

    # Regla 3 & 4 & 2: Manejo de consonantes seguidas de "qu", "y", o consonantes generales
    # Buscamos separar el clúster consonántico inicial (que puede incluir "qu" o "y")
    
    # Si empieza con consonantes seguidas de "qu" (ej. "square" -> clúster "sq", luego "uare")
    if ($word -match '^([^aeiou]*qu)(.*)$') {
        return $matches[2] + $matches[1] + 'ay'
    }

    # Si empieza con consonantes seguidas de "y" donde 'y' actúa como vocal (ej. "rhythm", "my")
    # Nota: si hay una consonante inicial seguida de 'y' (como 'my'), o múltiples seguidas de 'y' (como 'rhythm')
    if ($word -match '^([^aeiou]+)(y.*)$') {
        # Si la primera letra es una consonante y la segunda es 'y' en una palabra de 2 letras (ej. "my")
        if ($word.Length -eq 2 -and $word[1] -eq 'y') {
            return $word.Substring(1) + $word[0] + 'ay'
        }
        return $matches[2] + $matches[1] + 'ay'
    }

    # Regla 2 general: Mover consonantes iniciales al final y agregar "ay"
    if ($word -match '^([^aeiou]+)(.*)$') {
        return $matches[2] + $matches[1] + 'ay'
    }

    return $word + 'ay'
}