class Bob
  def self.hey(remark)
    # Limpiamos espacios en blanco innecesarios
    remark = remark.strip

    # 1. ¿No dijo nada?
    return "Fine. Be that way!" if remark.empty?

    # Definimos estados para mayor claridad
    is_question = remark.end_with?('?')
    # Un grito debe estar en mayúsculas y tener al menos una letra
    is_shouting = (remark == remark.upcase) && remark.match?(/[A-Z]/)

    # 2. Lógica de respuesta de Bob
    if is_shouting && is_question
      "Calm down, I know what I'm doing!"
    elsif is_shouting
      "Whoa, chill out!"
    elsif is_question
      "Sure."
    else
      "Whatever."
    end
  end
end