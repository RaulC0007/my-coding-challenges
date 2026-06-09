class School
  def initialize
    # Inicializamos el roster como un hash donde cada grado nuevo inicia con un arreglo vacío
    @roster = Hash.new { |hash, key| hash[key] = [] }
  end

  # Agrega un estudiante a un grado si no existe previamente en la escuela
  def add(student, grade_number)
    # Verificamos si el estudiante ya está inscrito en CUALQUIER grado
    if students_enrolled.include?(student)
      false
    else
      @roster[grade_number] << student
      true
    end
  end

  # Devuelve la lista ordenada alfabéticamente de los alumnos de un grado específico
  def grade(grade_number)
    @roster[grade_number].sort
  end

  # Devuelve una lista plana (Arreglo) de todos los estudiantes inscritos.
  # Se ordenan de menor a mayor grado, y alfabéticamente dentro de cada grado.
  def roster
    # .sort convierte el hash en una matriz ordenada por llaves: [[1, ["Jim"]], [2, ["Alex"]]]
    # .flat_map procesa cada par, ordena a los alumnos y los aplana en un único arreglo final.
    @roster.sort.flat_map do |_grade_number, students|
      students.sort
    end
  end

  private

  # Método auxiliar para aplanar todos los nombres de la escuela en una sola lista única
  def students_enrolled
    @roster.values.flatten
  end
end