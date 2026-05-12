class TwoBucket
  attr_reader :moves, :goal_bucket, :other_bucket

  def initialize(size1, size2, target, start_bucket)
    @s1, @s2 = size1, size2
    @target = target
    @start = start_bucket
    solve
  end

  private

  def solve
    # Paso 1: Llenar el cubo inicial (SIEMPRE es el primer movimiento)
    b1 = (@start == 'one') ? @s1 : 0
    b2 = (@start == 'two') ? @s2 : 0
    @moves = 1

    # REGLA ESPECIAL: Si el OTRO cubo tiene el tamaño del objetivo, 
    # la única forma legal de llegar a él sin violar la Regla 3 
    # es llenarlo directamente como segundo movimiento.
    if @start == 'one' && @s2 == @target
      b2 = @s2
      @moves += 1
    elsif @start == 'two' && @s1 == @target
      b1 = @s1
      @moves += 1
    end

    # Bucle de simulación
    until b1 == @target || b2 == @target
      @moves += 1
      if @start == 'one'
        if b2 == @s2 then b2 = 0                # Vaciar secundario si está lleno
        elsif b1 == 0 then b1 = @s1             # Llenar inicial si está vacío
        else                                    # Trasvasar
          amount = [@s2 - b2, b1].min
          b1 -= amount; b2 += amount
        end
      else
        if b1 == @s1 then b1 = 0                # Vaciar secundario si está lleno
        elsif b2 == 0 then b2 = @s2             # Llenar inicial si está vacío
        else                                    # Trasvasar
          amount = [@s1 - b1, b2].min
          b2 -= amount; b1 += amount
        end
      end
    end

    # Asignación de resultados
    @goal_bucket = (b1 == @target) ? 'one' : 'two'
    @other_bucket = (b1 == @target) ? b2 : b1
  end
end
