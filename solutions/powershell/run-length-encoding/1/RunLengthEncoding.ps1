Function Invoke-Encode() {
    <#
    .SYNOPSIS
    Implement run-length encoding function.

    .DESCRIPTION
    Run-length encoding (RLE) is a simple form of data compression, where runs (consecutive data elements) are replaced by just one data value and count.
    #>
    [CmdletBinding()]
    Param(
        [Parameter(ValueFromPipeline = $true)]
        [string]$Data
    )

    if ([string]::IsNullOrEmpty($Data)) {
        return ""
    }

    $result = [System.Text.StringBuilder]::new()
    $count = 1

    for ($i = 1; $i -lt $Data.Length; $i++) {
        # Usamos -ceq para comparación estricta sensible a mayúsculas/minúsculas
        if ($Data[$i] -ceq $Data[$i - 1]) {
            $count++
        } else {
            if ($count -gt 1) {
                [void]$result.Append($count)
            }
            [void]$result.Append($Data[$i - 1])
            $count = 1
        }
    }

    # Adjuntar la última racha
    if ($count -gt 1) {
        [void]$result.Append($count)
    }
    [void]$result.Append($Data[$Data.Length - 1])

    return $result.ToString()
}

Function Invoke-Decode() {
    <#
    .SYNOPSIS
    Implement run-length decoding function.

    .DESCRIPTION
    Decoding is the reverse of encoding compression, it turn the compressed data into the original form.
    #>
    [CmdletBinding()]
    Param(
        [Parameter(ValueFromPipeline = $true)]
        [string]$Data
    )
    
    if ([string]::IsNullOrEmpty($Data)) {
        return ""
    }

    $result = [System.Text.StringBuilder]::new()
    
    # Expresión regular que captura de forma segura grupos de dígitos opcionales seguidos de cualquier carácter
    $matches = [regex]::Matches($Data, '(\d*)(.)')

    foreach ($match in $matches) {
        $countStr = $match.Groups[1].Value
        $char = $match.Groups[2].Value
        $count = if ($countStr) { [int]$countStr } else { 1 }

        [void]$result.Append($char, $count)
    }

    return $result.ToString()
}