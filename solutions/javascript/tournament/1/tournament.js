const HEADER = "Team                           | MP |  W |  D |  L |  P";

const createTeam = () => ({
  MP: 0,
  W: 0,
  D: 0,
  L: 0,
  P: 0,
});

export const tournamentTally = (input) => {
  const teams = new Map();

  const getTeam = (name) => {
    if (!teams.has(name)) {
      teams.set(name, createTeam());
    }
    return teams.get(name);
  };

  if (input.trim() !== "") {
    for (const line of input.trim().split("\n")) {
      if (!line) continue;

      const [team1, team2, result] = line.split(";");

      if (!["win", "loss", "draw"].includes(result)) {
        continue;
      }

      const t1 = getTeam(team1);
      const t2 = getTeam(team2);

      t1.MP++;
      t2.MP++;

      switch (result) {
        case "win":
          t1.W++;
          t1.P += 3;
          t2.L++;
          break;

        case "loss":
          t2.W++;
          t2.P += 3;
          t1.L++;
          break;

        case "draw":
          t1.D++;
          t2.D++;
          t1.P++;
          t2.P++;
          break;
      }
    }
  }

  const rows = [...teams.entries()]
    .sort((a, b) => {
      const [, ta] = a;
      const [, tb] = b;

      if (tb.P !== ta.P) {
        return tb.P - ta.P;
      }

      return a[0].localeCompare(b[0]);
    })
    .map(([name, t]) => {
      const team = name.padEnd(31);

      return `${team}| ${String(t.MP).padStart(2)} | ${String(t.W).padStart(
        2
      )} | ${String(t.D).padStart(2)} | ${String(t.L).padStart(
        2
      )} | ${String(t.P).padStart(2)}`;
    });

  return [HEADER, ...rows].join("\n");
};
