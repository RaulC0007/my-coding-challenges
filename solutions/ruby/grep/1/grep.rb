class Grep
  def self.grep(pattern, flags, files)
    # Parseamos las banderas a un formato booleano cómodo
    line_numbers = flags.include?('-n')
    only_filenames = flags.include?('-l')
    case_insensitive = flags.include?('-i')
    invert_match = flags.include?('-v')
    entire_line = flags.include?('-x')

    # Guardaremos los resultados finales aquí
    output = []

    # Construimos la expresión regular según -i y -x
    regex_pattern = Regexp.escape(pattern)
    regex_pattern = "^#{regex_pattern}$" if entire_line
    regex_options = case_insensitive ? Regexp::IGNORECASE : 0
    search_regex = Regexp.new(regex_pattern, regex_options)

    files.each do |filename|
      # Leemos el archivo línea por línea manteniendo el índice de línea (empezando en 1)
      File.foreach(filename).with_index(1) do |line, line_num|
        # Removemos el salto de línea al final para evaluar limpiamente y estandarizar la salida
        clean_line = line.chomp
        
        # Evaluamos la coincidencia
        is_match = clean_line.match?(search_regex)
        
        # Aplicamos la bandera de inversión (-v)
        is_match = !is_match if invert_match

        if is_match
          if only_filenames
            # Si solo queremos nombres de archivos (-l), guardamos el nombre y pasamos al siguiente archivo
            output << filename
            break
          else
            # De lo contrario, construimos la línea con sus metadatos correspondientes sin el \n original
            prefix = ""
            prefix += "#{filename}:" if files.size > 1
            prefix += "#{line_num}:" if line_numbers
            
            output << "#{prefix}#{clean_line}"
          end
        end
      end
    end

    # CORRECCIÓN: Eliminamos duplicados y unimos todo usando saltos de línea "\n"
    output.uniq.join("\n")
  end
end