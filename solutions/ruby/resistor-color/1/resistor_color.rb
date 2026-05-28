class ResistorColor
  # Definimos la constante con los colores en el orden correcto
  # Usamos %w[] para crear un arreglo de strings de forma más limpia
  COLORS = %w[black brown red orange yellow green blue violet grey white]

  def self.color_code(color)
    # Buscamos el índice del color en nuestro arreglo
    COLORS.index(color)
  end
end