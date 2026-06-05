const DEFAULT_STUDENTS: Student[] = [
  'Alice',
  'Bob',
  'Charlie',
  'David',
  'Eve',
  'Fred',
  'Ginny',
  'Harriet',
  'Ileana',
  'Joseph',
  'Kincaid',
  'Larry',
]

const PLANT_CODES = {
  G: 'grass',
  V: 'violets',
  R: 'radishes',
  C: 'clover',
} as const

type Student = string
type Plant = (typeof PLANT_CODES)[keyof typeof PLANT_CODES]
type Plants = Plant[]

export class Garden {
  private studentPlants: Map<Student, Plants>;

  constructor(diagram: string, students: Student[] = DEFAULT_STUDENTS) {
    // Sort students alphabetically
    const sortedStudents = [...students].sort();
    
    // Split diagram into rows
    const [firstRow, secondRow] = diagram.split('\n');
    
    this.studentPlants = new Map();
    
    // Each student gets 2 cups from first row and 2 from second row
    for (let i = 0; i < sortedStudents.length; i++) {
      const student = sortedStudents[i];
      const startIdx = i * 2;
      
      const plants: Plants = [
        PLANT_CODES[firstRow[startIdx] as keyof typeof PLANT_CODES],
        PLANT_CODES[firstRow[startIdx + 1] as keyof typeof PLANT_CODES],
        PLANT_CODES[secondRow[startIdx] as keyof typeof PLANT_CODES],
        PLANT_CODES[secondRow[startIdx + 1] as keyof typeof PLANT_CODES],
      ];
      
      this.studentPlants.set(student, plants);
    }
  }

  public plants(student: Student): Plants {
    const result = this.studentPlants.get(student);
    if (!result) {
      throw new Error(`Student ${student} not found`);
    }
    return result;
  }
}