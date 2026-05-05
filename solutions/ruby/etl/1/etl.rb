class ETL
  def self.transform(old_data)
    # 1. Creamos un nuevo Hash vacío para almacenar el resultado
    new_data = {}

    # 2. Iteramos sobre el Hash original (puntos => [letras])
    old_data.each do |points, letters|
      # 3. Para cada arreglo de letras, iteramos sobre cada letra individual
      letters.each do |letter|
        # 4. Transformamos la letra a minúsculas
        # 5. La asignamos como clave en el nuevo Hash con su puntaje correspondiente
        new_data[letter.downcase] = points
      end
    end

    # 6. Devolvemos el Hash transformado
    new_data
  end
end