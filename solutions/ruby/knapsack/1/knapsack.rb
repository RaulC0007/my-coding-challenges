class Knapsack
  def initialize(maximum_weight)
    @maximum_weight = maximum_weight
  end

  def max_value(items)
    return 0 if @maximum_weight.zero? || items.empty?

    # Inicializamos nuestro arreglo DP de capacidad indexada
    dp = Array.new(@maximum_weight + 1, 0)

    items.each do |item|
      # CORRECCIÓN CRÍTICA: Extraemos las propiedades usando métodos de objeto, con fallback a hash
      weight = item.respond_to?(:weight) ? item.weight : (item[:weight] || item['weight'])
      value  = item.respond_to?(:value)  ? item.value  : (item[:value]  || item['value'])

      # Iteramos en reversa desde la capacidad máxima hasta el peso del ítem actual
      @maximum_weight.downto(weight) do |capacity|
        potential_value = dp[capacity - weight] + value
        if potential_value > dp[capacity]
          dp[capacity] = potential_value
        end
      end
    end

    # Retornamos el valor máximo acumulado en el límite exacto de la mochila
    dp[@maximum_weight]
  end
end