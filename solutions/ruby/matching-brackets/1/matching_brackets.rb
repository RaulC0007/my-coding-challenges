class Brackets
  # Definimos las parejas para una búsqueda rápida
  PAIRS = {
    ')' => '(',
    ']' => '[',
    '}' => '{'
  }.freeze

  def self.paired?(input)
    stack = []

    input.each_char do |char|
      if PAIRS.values.include?(char)
        # Es un símbolo de apertura: lo guardamos en la pila
        stack.push(char)
      elsif PAIRS.key?(char)
        # Es un símbolo de cierre: validamos contra el último de la pila
        return false if stack.pop != PAIRS[char]
      end
    end

    # Si la pila está vacía, todo se cerró correctamente
    stack.empty?
  end
end