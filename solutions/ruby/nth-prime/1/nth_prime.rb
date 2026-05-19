class Prime
  def self.nth(n)
    # 1. Validamos la entrada
    raise ArgumentError, "n debe ser un entero positivo" if n < 1

    # 2. Manejamos el primer caso manualmente para simplificar el bucle
    return 2 if n == 1

    count = 1 # Ya contamos al 2
    candidate = 3 # Empezamos a probar desde el primer impar

    while count < n
      if prime?(candidate)
        count += 1
      end
      
      # Si ya llegamos al conteo, devolvemos el candidato antes de incrementarlo
      return candidate if count == n
      
      # Saltamos de 2 en 2 para probar solo números impares
      candidate += 2
    end
  end

  private

  def self.prime?(num)
    # Un número es primo si no es divisible por ningún impar hasta su raíz cuadrada
    limit = Math.sqrt(num).to_i
    (3..limit).step(2) do |i|
      return false if num % i == 0
    end
    true
  end
end