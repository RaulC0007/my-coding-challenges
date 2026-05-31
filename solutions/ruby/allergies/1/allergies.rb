class Allergies
  # Definimos los alérgenos en orden de su valor binario
  ALLERGENS = {
    'eggs'         => 1,
    'peanuts'      => 2,
    'shellfish'    => 4,
    'strawberries' => 8,
    'tomatoes'     => 16,
    'chocolate'    => 32,
    'pollen'       => 64,
    'cats'         => 128
  }.freeze

  def initialize(score)
    @score = score
  end

  # Verifica si es alérgico a un item específico
  def allergic_to?(item)
    # Usamos el operador & para ver si el bit del alérgeno está "encendido" en la puntuación
    (@score & ALLERGENS[item]) != 0
  end

  # Devuelve la lista completa de alergias
  def list
    # Filtramos el hash buscando solo las llaves donde allergic_to? sea cierto
    ALLERGENS.keys.select { |item| allergic_to?(item) }
  end
end