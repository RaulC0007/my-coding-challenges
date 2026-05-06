class Sieve
  def initialize(limit)
    @limit = limit
  end

  def primes
    # 1. Si el límite es menor a 2, no hay números primos
    return [] if @limit < 2

    # 2. Creamos una estructura para marcar los números. 
    # Usaremos un hash donde la llave es el número y el valor es si es primo.
    # Inicialmente, todos los números del 2 al límite se consideran primos (true).
    sieve = {}
    (2..@limit).each { |n| sieve[n] = true }

    # 3. Aplicamos el algoritmo de Eratóstenes
    (2..@limit).each do |number|
      # Si el número ya está marcado como 'false', lo saltamos
      next unless sieve[number]

      # Si está marcado como 'true', es un primo.
      # Marcamos todos sus múltiplos como 'false' (no primos)
      # Empezamos en el doble del número (number * 2)
      multiple = number * 2
      while multiple <= @limit
        sieve[multiple] = false
        multiple += number
      end
    end

    # 4. Seleccionamos y devolvemos solo las llaves que quedaron con valor 'true'
    sieve.select { |_number, is_prime| is_prime }.keys
  end
end