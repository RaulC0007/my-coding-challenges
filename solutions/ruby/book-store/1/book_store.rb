class BookStore
  # Definimos el precio base por libro en centavos para evitar problemas de redondeo flotante
  BOOK_PRICE = 800

  # Tabla de descuentos según el tamaño del grupo
  DISCOUNTS = {
    1 => 1.00,
    2 => 0.95,
    3 => 0.90,
    4 => 0.80,
    5 => 0.75
  }.freeze

  def self.calculate_price(basket)
    return 0 if basket.empty?

    # 1. Contamos las frecuencias de cada libro usando tally (ej. [1, 1, 2] -> {1 => 2, 2 => 1})
    counts = basket.tally.values

    groups = []

    # 2. Creamos los grupos de forma codiciosa inicialmente
    while counts.any? { |c| c > 0 }
      # El tamaño del grupo será la cantidad de libros que aún tienen copias disponibles
      group_size = counts.count { |c| c > 0 }
      groups << group_size

      # Restamos una copia de cada libro usado en este grupo
      counts = counts.map { |c| c > 0 ? c - 1 : 0 }.reject(&:zero?)
    end

    # 3. Optimización Crítica: Rebalancear parejas de (5 y 3) por parejas de (4 y 4)
    while groups.include?(5) && groups.include?(3)
      groups.delete_at(groups.index(5))
      groups.delete_at(groups.index(3))
      groups.concat([4, 4])
    end

    # 4. Calculamos el costo total sumando el precio con descuento de cada grupo
    total_in_cents = groups.sum do |size|
      size * BOOK_PRICE * DISCOUNTS[size]
    end

    # Convertimos los centavos de regreso a formato flotante de dólares
    total_in_cents / 100.0
  end
end