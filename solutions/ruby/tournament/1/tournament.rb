class Tournament
  # Encabezado constante de la tabla
  HEADER = "#{'Team'.ljust(30)} | MP |  W |  D |  L |  P\n"

  def self.tally(input)
    # 1. Usamos un Hash con un bloque por defecto para crear nuevos equipos automáticamente
    teams = Hash.new { |h, k| h[k] = Team.new(k) }

    # 2. Procesamos cada línea del input
    input.strip.split("\n").each do |line|
      team1_name, team2_name, result = line.split(';')
      
      case result
      when 'win'
        teams[team1_name].add_win
        teams[team2_name].add_loss
      when 'loss'
        teams[team1_name].add_loss
        teams[team2_name].add_win
      when 'draw'
        teams[team1_name].add_draw
        teams[team2_name].add_draw
      end
    end

    # 3. Ordenamos: -points (descendente), name (alfabético)
    sorted_teams = teams.values.sort_by { |t| [-t.points, t.name] }

    # 4. Generamos la tabla final
    HEADER + sorted_teams.map(&:format_row).join("\n") + (sorted_teams.empty? ? "" : "\n")
  end

  # Clase interna para encapsular la lógica de cada equipo
  class Team
    attr_reader :name, :w, :d, :l

    def initialize(name)
      @name = name
      @w = @d = @l = 0
    end

    def mp; @w + @d + @l; end
    def points; (@w * 3) + @d; end

    def add_win;  @w += 1; end
    def add_draw; @d += 1; end
    def add_loss; @l += 1; end

    def format_row
      # %-30s -> String de 30 caracteres alineado a la izquierda
      # %3d   -> Entero de 3 espacios (para que los números se vean ordenados)
      format("%-30s | %2d | %2d | %2d | %2d | %2d", name, mp, w, d, l, points)
    end
  end
end