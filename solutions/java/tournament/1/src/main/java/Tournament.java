import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

class Tournament {
    // Usamos un mapa para almacenar y acceder rápidamente a cada equipo por su nombre
    private final Map<String, TeamStats> teams = new HashMap<>();

    // Plantilla de fila fija con espaciados exactos: 30 caracteres para el nombre, 
    // seguidos de las columnas numéricas alineadas a la derecha con 2 espacios de ancho.
    private static final String HEADER = "Team                           | MP |  W |  D |  L |  P\n";
    private static final String ROW_FORMAT = "%-30s | %2d | %2d | %2d | %2d | %2d\n";

    void applyResults(String resultString) {
        if (resultString == null || resultString.strip().isEmpty()) {
            return;
        }

        // Procesamos el string línea por línea
        String[] lines = resultString.split("\n");
        for (String line : lines) {
            line = line.strip();
            if (line.isEmpty()) continue;

            String[] tokens = line.split(";");
            if (tokens.length < 3) continue;

            String teamAName = tokens[0];
            String teamBName = tokens[1];
            String outcome = tokens[2];

            // Obtenemos o creamos las estadísticas para ambos equipos
            TeamStats teamA = teams.computeIfAbsent(teamAName, TeamStats::new);
            TeamStats teamB = teams.computeIfAbsent(teamBName, TeamStats::new);

            // Aplicamos las reglas del torneo según el resultado del primer equipo
            switch (outcome) {
                case "win":
                    teamA.addWin();
                    teamB.addLoss();
                    break;
                case "loss":
                    teamA.addLoss();
                    teamB.addWin();
                    break;
                case "draw":
                    teamA.addDraw();
                    teamB.addDraw();
                    break;
            }
        }
    }

    String printTable() {
        // Si no se procesó ningún partido, devolvemos únicamente la cabecera de la tabla
        if (teams.isEmpty()) {
            return HEADER;
        }

        // Ordenamos los equipos usando un comparador personalizado
        String tableBody = teams.values().stream()
            .sorted((t1, t2) -> {
                // Regla 1: Por puntos, de forma descendente (t2 comparado con t1)
                int pointsCompare = Integer.compare(t2.getPoints(), t1.getPoints());
                if (pointsCompare != 0) {
                    return pointsCompare;
                }
                // Regla 2: En caso de empate, alfabéticamente de forma ascendente (t1 comparado con t2)
                return t1.getName().compareTo(t2.getName());
            })
            // Mapeamos cada objeto de equipo a su respectivo formato de fila de texto
            .map(team -> String.format(ROW_FORMAT, 
                team.getName(), team.getMatchesPlayed(), team.getWins(), 
                team.getDraws(), team.getLosses(), team.getPoints()))
            .collect(Collectors.joining());

        return HEADER + tableBody;
    }

    // --- Clase Interna para Representar las Estadísticas de un Equipo ---
    private static class TeamStats {
        private final String name;
        private int wins = 0;
        private int draws = 0;
        private int losses = 0;

        public TeamStats(String name) {
            this.name = name;
        }

        public String getName() { return name; }
        public int getWins() { return wins; }
        public int getDraws() { return draws; }
        public int getLosses() { return losses; }

        public int getMatchesPlayed() {
            return wins + draws + losses;
        }

        public int getPoints() {
            return (wins * 3) + (draws * 1);
        }

        public void addWin() { wins++; }
        public void addDraw() { draws++; }
        public void addLoss() { losses++; }
    }
}