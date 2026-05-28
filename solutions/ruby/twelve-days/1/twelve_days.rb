class TwelveDays
  # Definimos los datos base de la canción
  DATA = [
    { day: 'first', gift: 'a Partridge in a Pear Tree.' },
    { day: 'second', gift: 'two Turtle Doves' },
    { day: 'third', gift: 'three French Hens' },
    { day: 'fourth', gift: 'four Calling Birds' },
    { day: 'fifth', gift: 'five Gold Rings' },
    { day: 'sixth', gift: 'six Geese-a-Laying' },
    { day: 'seventh', gift: 'seven Swans-a-Swimming' },
    { day: 'eighth', gift: 'eight Maids-a-Milking' },
    { day: 'ninth', gift: 'nine Ladies Dancing' },
    { day: 'tenth', gift: 'ten Lords-a-Leaping' },
    { day: 'eleventh', gift: 'eleven Pipers Piping' },
    { day: 'twelfth', gift: 'twelve Drummers Drumming' }
  ]

  def self.song
    # Generamos estrofas del 1 al 12 y las unimos con dos saltos de línea
    (1..12).map { |n| verse(n) }.join("\n\n") + "\n"
  end

  private

  def self.verse(n)
    # n-1 porque los arreglos empiezan en 0
    day_info = DATA[n - 1]
    
    # Construimos la introducción
    intro = "On the #{day_info[:day]} day of Christmas my true love gave to me: "
    
    # Construimos la lista de regalos acumulada
    gifts = []
    (n - 1).downto(0) do |i|
      gift_text = DATA[i][:gift]
      
      # Si es el primer regalo (i=0) y no es la primera estrofa (n>1), añadimos 'and '
      if i == 0 && n > 1
        gifts << "and #{gift_text}"
      else
        gifts << gift_text
      end
    end

    intro + gifts.join(", ")
  end
end