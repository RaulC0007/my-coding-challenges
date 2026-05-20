class WordProblem
  # Mapeo de comandos verbales a operadores aritméticos nativos de Ruby
  OPERATORS = {
    'plus'          => :+,
    'minus'         => :-,
    'multiplied'    => :*,
    'divided'       => :/
  }.freeze

  def initialize(question)
    @question = question
  end

  def answer
    # 1. Validaciones iniciales básicas de formato
    unless @question.start_with?("What is ") && @question.end_with?("?")
      raise ArgumentError, "Unknown question format"
    end

    # 2. Normalizar el texto de la pregunta
    # Quitamos "What is ", el "?" final y simplificamos "multiplied by" / "divided by"
    normalized = @question
                 .sub(/^What is /, "")
                 .sub(/\?$/, "")
                 .gsub(/multiplied by/, "multiplied")
                 .gsub(/divided by/, "divided")

    tokens = normalized.split(" ")

    # Si después de limpiar no queda nada, es una pregunta inválida
    raise ArgumentError, "Empty question" if tokens.empty?

    # 3. Procesar y validar la secuencia de tokens
    # El primer elemento obligatoriamente debe ser un número entero válido
    unless tokens.first =~ /^-?\d+$/
      raise ArgumentError, "Problem must start with a number"
    end

    result = tokens.shift.to_i

    # Procesamos los tokens en parejas estrictas: [Operador, Número]
    while !tokens.empty?
      operator_token = tokens.shift
      
      # Si el operador no está en nuestra lista aprobada, es un error de operación no soportada o sintaxis
      unless OPERATORS.key?(operator_token)
        raise ArgumentError, "Unsupported or invalid operator: #{operator_token}"
      end

      # El siguiente token obligatoriamente tiene que ser el operando (un número)
      raise ArgumentError, "Missing number after operator" if tokens.empty?
      
      number_token = tokens.shift
      unless number_token =~ /^-?\d+$/
        raise ArgumentError, "Invalid syntax, expected a number: #{number_token}"
      end

      # Ejecutamos la operación de izquierda a derecha dinámicamente
      operation = OPERATORS[operator_token]
      result = result.send(operation, number_token.to_i)
    end

    result
  end
end

# Alias de compatibilidad por si los tests buscan instanciar Wordy en lugar de WordProblem
Wordy = WordProblem