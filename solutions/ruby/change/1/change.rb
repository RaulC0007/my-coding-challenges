class Change
  # Definición de las excepciones específicas requeridas por las pruebas
  class ImpossibleCombinationError < ArgumentError; end
  class NegativeTargetError < ArgumentError; end

  def self.generate(coins, target)
    # 1. Validaciones de frontera
    return [] if target == 0
    raise NegativeTargetError, "Target amount cannot be negative" if target < 0

    # Inicializamos el arreglo de programación dinámica (Bottom-Up)
    min_change = Array.new(target + 1, nil)
    min_change[0] = [] 

    # 2. Construcción de sub-cambios óptimos
    (1..target).each do |amount|
      best_combination = nil

      coins.each do |coin|
        if coin <= amount && !min_change[amount - coin].nil?
          potential_combination = min_change[amount - coin] + [coin]

          if best_combination.nil? || potential_combination.length < best_combination.length
            best_combination = potential_combination
          end
        end
      end

      min_change[amount] = best_combination
    end

    # 3. Si no se pudo formar el monto, lanzamos el error de combinación imposible
    if min_change[target].nil?
      raise ImpossibleCombinationError, "Cannot make change with given coins"
    end

    # Devolvemos el arreglo ordenado de menor a mayor
    min_change[target].sort
  end
end