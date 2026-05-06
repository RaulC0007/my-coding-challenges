class Proverb
  def initialize(*chain, qualifier: nil)
    # 1. Guardamos la lista de palabras (chain)
    # El uso de * permite recibir una lista de argumentos o un arreglo
    @chain = chain
    @qualifier = qualifier
  end

  def to_s
    # 2. Si la lista está vacía, devolvemos un string vacío
    return "" if @chain.empty?

    # 3. Generamos las líneas principales comparando elementos pares (A, B)
    # each_cons(2) crea pares: [nail, shoe], [shoe, horse], etc.
    lines = @chain.each_cons(2).map do |want, lost|
      "For want of a #{want} the #{lost} was lost."
    end

    # 4. Añadimos la línea final usando el primer elemento
    # Si existe un qualifier (como 'horseshoe'), se añade antes del nombre
    first_item = @qualifier ? "#{@qualifier} #{@chain.first}" : @chain.first
    lines << "And all for the want of a #{first_item}."

    # 5. Unimos todas las líneas con saltos de línea
    lines.join("\n")
  end
end