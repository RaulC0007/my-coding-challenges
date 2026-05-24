class ListOps
  # 1. 'arrays' cuenta los elementos uno por uno
  def self.arrays(list)
    counter = 0
    list.each { counter += 1 }
    counter
  end

  # 2. 'concatter' añade los elementos de list2 al final de list1
  def self.concatter(list1, list2)
    result = []
    list1.each { |item| result << item }
    list2.each { |item| result << item }
    result
  end

  # 3. 'mapper' aplica el bloque a cada elemento
  def self.mapper(list, &block)
    result = []
    list.each { |item| result << block.call(item) }
    result
  end

  # 4. 'filterer' evalúa cada elemento con el predicado
  def self.filterer(list, &block)
    result = []
    list.each { |item| result << item if block.call(item) }
    result
  end

  # 5. 'reverser' construye una nueva lista en orden inverso
  def self.reverser(list)
    result = []
    index = arrays(list) - 1
    while index >= 0
      result << list[index]
      index -= 1
    end
    result
  end

  # 6. Reductor genérico por la izquierda (foldl)
  def self.foldl(list, init, &block)
    acc = init
    list.each { |item| acc = block.call(acc, item) }
    acc
  end

  # 7. 'sum_reducer' suma todos los elementos desde 0
  def self.sum_reducer(list)
    foldl(list, 0) { |acc, item| acc + item }
  end

  # 8. 'factorial_reducer' multiplica todos los elementos desde 1
  def self.factorial_reducer(list)
    foldl(list, 1) { |acc, item| acc * item }
  end
end