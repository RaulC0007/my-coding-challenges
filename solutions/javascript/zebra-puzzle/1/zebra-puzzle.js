// A helper function to generate all 120 permutations of a 5-element array
const getPermutations = (arr) => {
  if (arr.length === 0) return [[]];
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const rest = getPermutations([...arr.slice(0, i), ...arr.slice(i + 1)]);
    for (let j = 0; j < rest.length; j++) {
      result.push([arr[i], ...rest[j]]);
    }
  }
  return result;
};

// Generate our base permutations for 5 houses (Indices 0 to 4)
const PERMUTATIONS = getPermutations([0, 1, 2, 3, 4]);

export class ZebraPuzzle {
  constructor() {
    this._waterDrinker = '';
    this._zebraOwner = '';
    this.solve();
  }

  solve() {
    const nationalitiesList = ['Englishman', 'Spaniard', 'Ukrainian', 'Norwegian', 'Japanese'];

    // We map arrays to represent house indices (0-4) for each property.
    // E.g., `c[4]` represents the house index of the Blue house.
    
    for (const c of PERMUTATIONS) {
      // Colors: 0:Red, 1:Green, 2:Ivory, 3:Yellow, 4:Blue
      if (c[4] !== 1) continue; // Norwegian is 0, is next to Blue. So Blue = 1
      if (c[1] !== c[2] + 1) continue; // Green is immediately right of Ivory

      for (const n of PERMUTATIONS) {
        // Nationalities: 0:Englishman, 1:Spaniard, 2:Ukrainian, 3:Norwegian, 4:Japanese
        if (n[3] !== 0) continue; // Norwegian lives in first house
        if (n[0] !== c[0]) continue; // Englishman lives in Red

        for (const d of PERMUTATIONS) {
          // Drinks: 0:Coffee, 1:Tea, 2:Milk, 3:OrangeJuice, 4:Water
          if (d[2] !== 2) continue; // Middle house (index 2) drinks Milk
          if (d[0] !== c[1]) continue; // Green house drinks Coffee
          if (d[1] !== n[2]) continue; // Ukrainian drinks Tea

          for (const h of PERMUTATIONS) {
            // Hobbies: 0:Dancing, 1:Painter, 2:Reading, 3:Football, 4:Chess
            if (h[1] !== c[3]) continue; // Painter is in Yellow house
            if (h[4] !== n[4]) continue; // Japanese plays Chess
            if (h[3] !== d[3]) continue; // Football player drinks OJ

            for (const p of PERMUTATIONS) {
              // Pets: 0:Dog, 1:Snails, 2:Fox, 3:Horse, 4:Zebra
              if (p[0] !== n[1]) continue; // Spaniard owns Dog
              if (p[1] !== h[0]) continue; // Snails owner dances
              if (Math.abs(h[2] - p[2]) !== 1) continue; // Reading next to Fox
              if (Math.abs(h[1] - p[3]) !== 1) continue; // Painter next to Horse

              // If we make it here, all constraints are satisfied!
              const waterHouseIndex = d[4];
              const zebraHouseIndex = p[4];

              // Find which nationality lives at those specific house indices
              this._waterDrinker = nationalitiesList[n.indexOf(waterHouseIndex)];
              this._zebraOwner = nationalitiesList[n.indexOf(zebraHouseIndex)];
              
              return; // We found the unique solution, no need to keep searching
            }
          }
        }
      }
    }
  }

  waterDrinker() {
    return this._waterDrinker;
  }

  zebraOwner() {
    return this._zebraOwner;
  }
}
