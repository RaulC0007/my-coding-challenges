export class List {
  constructor(list = []) {
    this.list = list;
  }

  compare(otherList) {
    const a = this.list;
    const b = otherList.list;
    
    // Handle empty list cases
    if (a.length === 0 && b.length === 0) return 'EQUAL';
    if (a.length === 0) return 'SUBLIST';
    if (b.length === 0) return 'SUPERLIST';
    
    // Check if lists are equal
    if (this.areEqual(a, b)) return 'EQUAL';
    
    // Check if A is superlist of B (A contains B)
    if (this.isSublist(b, a)) return 'SUPERLIST';
    
    // Check if A is sublist of B (B contains A)
    if (this.isSublist(a, b)) return 'SUBLIST';
    
    // None of the above
    return 'UNEQUAL';
  }

  // Helper function to check if two arrays are equal
  areEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }

  // Helper function to check if sub is a contiguous sublist of main
  isSublist(sub, main) {
    if (sub.length === 0) return true;
    if (sub.length > main.length) return false;
    
    for (let i = 0; i <= main.length - sub.length; i++) {
      let found = true;
      for (let j = 0; j < sub.length; j++) {
        if (main[i + j] !== sub[j]) {
          found = false;
          break;
        }
      }
      if (found) return true;
    }
    return false;
  }
}