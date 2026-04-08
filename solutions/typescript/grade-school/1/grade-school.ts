export class GradeSchool {
  private _roster: Map<number, Set<string>>;

  constructor() {
    this._roster = new Map<number, Set<string>>();
  }

  roster(): Record<string, string[]> {
    const result: Record<string, string[]> = {};
    
    // Get grades in ascending order
    const grades = Array.from(this._roster.keys()).sort((a, b) => a - b);
    
    for (const grade of grades) {
      const studentsSet = this._roster.get(grade);
      if (studentsSet) {
        result[grade.toString()] = Array.from(studentsSet).sort();
      }
    }
    
    return result;
  }

  add(student: string, grade: number): void {
    // Check if student already exists in any grade
    for (const [existingGrade, students] of this._roster.entries()) {
      if (students.has(student)) {
        // Student already exists, remove from current grade
        const gradeSet = this._roster.get(existingGrade);
        if (gradeSet) {
          gradeSet.delete(student);
          // If the grade is now empty, delete it
          if (gradeSet.size === 0) {
            this._roster.delete(existingGrade);
          }
        }
        break;
      }
    }
    
    // Add student to the specified grade
    if (!this._roster.has(grade)) {
      this._roster.set(grade, new Set<string>());
    }
    
    const gradeSet = this._roster.get(grade);
    if (gradeSet) {
      gradeSet.add(student);
    }
  }

  grade(grade: number): string[] {
    const studentsSet = this._roster.get(grade);
    if (!studentsSet) {
      return [];
    }
    
    return Array.from(studentsSet).sort();
  }
}