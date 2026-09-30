pub fn plants(diagram: &str, student: &str) -> Vec<&'static str> {
    // List of students in alphabetical order
    let students = [
        "Alice", "Bob", "Charlie", "David", "Eve", "Fred",
        "Ginny", "Harriet", "Ileana", "Joseph", "Kincaid", "Larry"
    ];
    
    // Mapping from plant code to full name
    let plant_names: std::collections::HashMap<char, &'static str> = [
        ('G', "grass"),
        ('C', "clover"),
        ('R', "radishes"),
        ('V', "violets"),
    ].iter().cloned().collect();
    
    // Find the student's index
    let student_index = students.iter().position(|&s| s == student)
        .expect("Student not found");
    
    // Split the diagram into two rows
    let rows: Vec<&str> = diagram.lines().collect();
    if rows.len() != 2 {
        panic!("Diagram must have exactly 2 rows");
    }
    
    let row1 = rows[0];
    let row2 = rows[1];
    
    // Each student gets 2 cups per row, so they occupy 2 characters in each row
    let start = student_index * 2;
    let end = start + 2;
    
    // Get the plants for this student from both rows
    let mut result = Vec::new();
    
    // Row 1 (nearest the windows) - first 2 plants
    for ch in row1[start..end].chars() {
        result.push(plant_names[&ch]);
    }
    
    // Row 2 - next 2 plants
    for ch in row2[start..end].chars() {
        result.push(plant_names[&ch]);
    }
    
    result
}