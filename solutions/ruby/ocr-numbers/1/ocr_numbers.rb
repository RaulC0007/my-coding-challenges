class OcrNumbers
  # Diccionario corregido: Cada combinación de caracteres 3x4 es única
  DIGIT_MAP = {
    " _ \n| |\n|_|\n   " => "0",
    "   \n  |\n  |\n   " => "1",
    " _ \n _|\n|_ \n   " => "2",
    " _ \n _|\n _|\n   " => "3",
    "   \n|_|\n  |\n   " => "4",
    " _ \n|_ \n _|\n   " => "5",
    " _ \n|_ \n|_|\n   " => "6",
    " _ \n  |\n  |\n   " => "7", # El 7 estándar (lleva el guion bajo arriba)
    " _ \n|_|\n|_|\n   " => "8",
    " _ \n|_|\n _|\n   " => "9"
  }.freeze

  def self.convert(input)
    lines = input.split("\n", -1) # El -1 conserva las líneas vacías al final

    # 1. Validaciones de tamaño de la cuadrícula
    raise ArgumentError if lines.size % 4 != 0
    raise ArgumentError if lines.any? { |line| line.length % 3 != 0 }

    # Procesamos las líneas en grupos de 4 (filas de dígitos)
    row_results = lines.each_slice(4).map do |ocr_row|
      convert_row(ocr_row)
    end

    # Unimos las filas de texto traduciéndolas con una coma ',' entre ellas
    row_results.join(',')
  end

  private

  def self.convert_row(ocr_row)
    line_length = ocr_row.first.length
    digits_count = line_length / 3
    row_digits = []

    # Recorremos las columnas de 3 en 3
    digits_count.times do |i|
      col_start = i * 3
      
      # Recortamos el bloque de 3x4 para este dígito en específico
      digit_lines = ocr_row.map { |line| line[col_start, 3] }
      
      # Lo unimos usando saltos de línea para que coincida con el formato del diccionario
      digit_string = digit_lines.join("\n")

      # Buscamos en el mapa; si no se reconoce, devolvemos un "?"
      row_digits << (DIGIT_MAP[digit_string] || "?")
    end

    row_digits.join
  end
end