interface TeamStats {
  name: string;
  mp: number;
  w: number;
  d: number;
  l: number;
  p: number;
}

export class Tournament {
  public tally(input: string): string {
    const stats: Map<string, TeamStats> = new Map();
    
    // Process each line of input
    const lines = input.trim().split('\n');
    
    for (const line of lines) {
      if (line === '') continue;
      
      const [team1, team2, result] = line.split(';');
      
      // Initialize teams if not already in map
      if (!stats.has(team1)) {
        stats.set(team1, { name: team1, mp: 0, w: 0, d: 0, l: 0, p: 0 });
      }
      if (!stats.has(team2)) {
        stats.set(team2, { name: team2, mp: 0, w: 0, d: 0, l: 0, p: 0 });
      }
      
      const team1Stats = stats.get(team1)!;
      const team2Stats = stats.get(team2)!;
      
      // Update matches played
      team1Stats.mp++;
      team2Stats.mp++;
      
      // Update based on result
      if (result === 'win') {
        team1Stats.w++;
        team1Stats.p += 3;
        team2Stats.l++;
      } else if (result === 'loss') {
        team1Stats.l++;
        team2Stats.w++;
        team2Stats.p += 3;
      } else if (result === 'draw') {
        team1Stats.d++;
        team1Stats.p += 1;
        team2Stats.d++;
        team2Stats.p += 1;
      }
    }
    
    // Convert to array and sort
    const sortedTeams = Array.from(stats.values()).sort((a, b) => {
      // Sort by points descending
      if (a.p !== b.p) {
        return b.p - a.p;
      }
      // Then by name alphabetically
      return a.name.localeCompare(b.name);
    });
    
    // Build output
    const header = 'Team                           | MP |  W |  D |  L |  P';
    const rows: string[] = [header];
    
    for (const team of sortedTeams) {
      const name = team.name.padEnd(30, ' ');
      const mp = team.mp.toString().padStart(2, ' ');
      const w = team.w.toString().padStart(2, ' ');
      const d = team.d.toString().padStart(2, ' ');
      const l = team.l.toString().padStart(2, ' ');
      const p = team.p.toString().padStart(2, ' ');
      
      rows.push(`${name} | ${mp} | ${w} | ${d} | ${l} | ${p}`);
    }
    
    return rows.join('\n');
  }
}