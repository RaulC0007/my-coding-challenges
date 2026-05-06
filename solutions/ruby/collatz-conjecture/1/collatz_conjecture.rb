class CollatzConjecture
  def self.steps(n)
    # 1. Validar que el número sea un entero positivo
    raise ArgumentError, "Solo se permiten números enteros positivos" if n <= 0

    steps_count = 0

    # 2. Iterar hasta que el número llegue a 1
    while n != 1
      if n.even?
        n = n / 2
      else
        n = 3 * n + 1
      end
      
      # 3. Incrementar el contador de pasos
      steps_count += 1
    end

    steps_count
  end
end