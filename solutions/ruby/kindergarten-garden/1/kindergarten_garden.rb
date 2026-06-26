class Garden
  # Lista por defecto de los 12 estudiantes en orden alfabético
  DEFAULT_STUDENTS = %w[
    Alice Bob Charlie David Eve Fred
    Ginny Harriet Ileana Joseph Kincaid Larry
  ].freeze

  # Diccionario para traducir los caracteres a símbolos de plantas
  PLANT_MAPPING = {
    'G' => :grass,
    'C' => :clover,
    'R' => :radishes,
    'V' => :violets
  }.freeze

  def initialize(diagram, students = DEFAULT_STUDENTS)
    # Dividimos el diagrama por el salto de línea para separar la fila 1 de la fila 2
    @row1, @row2 = diagram.split("\n")
    
    # Ordenamos a los estudiantes alfabéticamente (por si nos pasan una lista desordenada)
    @students = students.sort

    # Aplicamos metaprogramación para definir los métodos de los alumnos dinámicamente
    define_student_methods
  end

  private

  def define_student_methods
    @students.each_with_index do |student, index|
      # Convertimos el nombre del estudiante a minúsculas y a un símbolo (ej: "Alice" -> :alice)
      method_name = student.downcase.to_sym

      # Usamos define_method para crear el método en tiempo de ejecución
      define_singleton_method(method_name) do
        # Calculamos el índice inicial de las columnas para este estudiante
        start_col = index * 2

        # Extraemos los dos caracteres de la primera fila y los dos de la segunda
        chars = [
          @row1[start_col], @row1[start_col + 1],
          @row2[start_col], @row2[start_col + 1]
        ]

        # Traducimos los caracteres a sus respectivos símbolos de plantas
        chars.map { |char| PLANT_MAPPING[char] }
      end
    end
  end
end