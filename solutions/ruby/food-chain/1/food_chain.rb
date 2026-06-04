class FoodChain
  # Definimos la estructura de datos con los animales y sus detalles únicos
  # CORRECCIÓN: Se eliminó el punto final de :custom_chase para evitar la duplicación.
  ANIMALS = [
    { name: 'fly', comment: nil },
    { name: 'spider', comment: 'It wriggled and jiggled and tickled inside her.', custom_chase: 'spider that wriggled and jiggled and tickled inside her' },
    { name: 'bird', comment: 'How absurd to swallow a bird!' },
    { name: 'cat', comment: 'Imagine that, to swallow a cat!' },
    { name: 'dog', comment: 'What a hog, to swallow a dog!' },
    { name: 'goat', comment: 'Just opened her throat and swallowed a goat!' },
    { name: 'cow', comment: "I don't know how she swallowed a cow!" },
    { name: 'horse', comment: "She's dead, of course!" }
  ].freeze

  def self.song
    # Generamos las estrofas del índice 0 al 7 y las unimos con un doble salto de línea
    (0...ANIMALS.size).map { |index| verse(index) }.join("\n")
  end

  private

  def self.verse(index)
    current_animal = ANIMALS[index]
    lines = []

    # 1. Primera línea estándar para todas las estrofas
    lines << "I know an old lady who swallowed a #{current_animal[:name]}."

    # 2. Agregar el comentario único de este animal si existe
    lines << current_animal[:comment] if current_animal[:comment]

    # 3. Si es el último animal (el caballo), el juego termina aquí
    return lines.join("\n") + "\n" if current_animal[:name] == 'horse'

    # 4. Construir la cadena de persecución acumulativa de forma descendente
    index.downto(1) do |i|
      predator = ANIMALS[i]
      prey = ANIMALS[i - 1]
      
      # Caso especial: El pájaro atrapa a la araña con su descripción larga
      prey_name = prey[:custom_chase] || prey[:name]
      
      # Aquí se coloca el punto final de forma segura para todos los animales
      lines << "She swallowed the #{predator[:name]} to catch the #{prey_name}."
    end

    # 5. Estribillo final para todas las estrofas normales
    lines << "I don't know why she swallowed the fly. Perhaps she'll die."

    # Unimos las líneas y nos aseguramos de que cada estrofa termine con su salto de línea correspondiente
    lines.join("\n") + "\n"
  end
end