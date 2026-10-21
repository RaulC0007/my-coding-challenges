use std::collections::BTreeMap;

pub struct School {
    grades: BTreeMap<u32, Vec<String>>,
}

impl School {
    pub fn new() -> School {
        School {
            grades: BTreeMap::new(),
        }
    }

    pub fn add(&mut self, grade: u32, student: &str) -> bool {
        // Verificar si el estudiante ya existe en cualquier grado
        for students in self.grades.values() {
            if students.contains(&student.to_string()) {
                return false;
            }
        }

        let grade_list = self.grades.entry(grade).or_default();
        grade_list.push(student.to_string());
        grade_list.sort();
        true
    }

    pub fn grades(&self) -> Vec<u32> {
        self.grades.keys().cloned().collect()
    }

    pub fn grade(&self, grade: u32) -> Vec<String> {
        self.grades.get(&grade).cloned().unwrap_or_default()
    }
}