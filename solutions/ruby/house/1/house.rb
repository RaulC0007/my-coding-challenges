class House
  # Lista ordenada de los sujetos que van apareciendo en la canción
  SUBJECTS = [
    'the house',
    'the malt',
    'the rat',
    'the cat',
    'the dog',
    'the cow with the crumpled horn',
    'the maiden all forlorn',
    'the man all tattered and torn',
    'the priest all shaven and shorn',
    'the rooster that crowed in the morn',
    'the farmer sowing his corn',
    'the horse and the hound and the horn'
  ].freeze

  # Lista ordenada de las acciones correspondientes a cada personaje
  VERBS = [
    'lay in',
    'ate',
    'killed',
    'worried',
    'tossed',
    'milked',
    'kissed',
    'married',
    'woke',
    'kept',
    'belonged to'
  ].freeze

  def self.recite(start_verse, end_verse)
    (start_verse..end_verse).map { |number| build_verse(number) }.join("\n") + "\n"
  end

  private

  def self.build_verse(number)
    verse_parts = []

    # Empezamos desde el personaje de la estrofa actual (number - 1) y bajamos hasta 0
    (number - 1).downto(0) do |i|
      if i == number - 1
        # La línea inicial de la estrofa siempre arranca con "This is"
        verse_parts << "This is #{SUBJECTS[i]}"
      else
        # Las líneas interiores conectan el verbo del personaje i con el personaje anterior
        verse_parts << "that #{VERBS[i]} #{SUBJECTS[i]}"
      end
    end

    # Todas las estrofas se cierran con el remate icónico final
    verse_parts.join(" ") + " that Jack built."
  end
end