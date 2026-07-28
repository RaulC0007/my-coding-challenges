const DEFAULT_STUDENTS = [
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
];

const PLANT_CODES = {
  G: 'grass',
  V: 'violets',
  R: 'radishes',
  C: 'clover',
};

export class Garden {
  constructor(diagram, students = DEFAULT_STUDENTS) {
    // Split the diagram into its top and bottom rows
    this.rows = diagram.split('\n');
    
    // Sort the students alphabetically to match left-to-right cup assignments.
    // We spread (...) into a new array to avoid mutating the original array.
    this.students = [...students].sort();
  }

  plants(student) {
    const studentIndex = this.students.indexOf(student);
    
    if (studentIndex === -1) {
      throw new Error('Student is not in the class.');
    }

    // Since each student gets 2 plants per row, multiply their index by 2
    // to find where their portion of the string begins.
    const startingIndex = studentIndex * 2;

    // Extract the four plant codes assigned to the student
    const studentPlants = [
      this.rows[0][startingIndex],     // Top row, first cup
      this.rows[0][startingIndex + 1], // Top row, second cup
      this.rows[1][startingIndex],     // Bottom row, first cup
      this.rows[1][startingIndex + 1], // Bottom row, second cup
    ];

    // Map the single-letter codes to their full plant names
    return studentPlants.map(code => PLANT_CODES[code]);
  }
}
