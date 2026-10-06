#[derive(Debug, PartialEq, Eq)]
pub enum Allergen {
    Eggs,
    Peanuts,
    Shellfish,
    Strawberries,
    Tomatoes,
    Chocolate,
    Pollen,
    Cats,
}

pub struct Allergies {
    score: u32,
}

impl Allergies {
    pub fn new(score: u32) -> Self {
        Allergies { score }
    }

    pub fn is_allergic_to(&self, allergen: &Allergen) -> bool {
        let allergen_value = match allergen {
            Allergen::Eggs => 1,
            Allergen::Peanuts => 2,
            Allergen::Shellfish => 4,
            Allergen::Strawberries => 8,
            Allergen::Tomatoes => 16,
            Allergen::Chocolate => 32,
            Allergen::Pollen => 64,
            Allergen::Cats => 128,
        };
        (self.score & allergen_value) != 0
    }

    pub fn allergies(&self) -> Vec<Allergen> {
        let mut result = Vec::new();
        
        // Check each allergen in order of increasing value
        if self.is_allergic_to(&Allergen::Eggs) {
            result.push(Allergen::Eggs);
        }
        if self.is_allergic_to(&Allergen::Peanuts) {
            result.push(Allergen::Peanuts);
        }
        if self.is_allergic_to(&Allergen::Shellfish) {
            result.push(Allergen::Shellfish);
        }
        if self.is_allergic_to(&Allergen::Strawberries) {
            result.push(Allergen::Strawberries);
        }
        if self.is_allergic_to(&Allergen::Tomatoes) {
            result.push(Allergen::Tomatoes);
        }
        if self.is_allergic_to(&Allergen::Chocolate) {
            result.push(Allergen::Chocolate);
        }
        if self.is_allergic_to(&Allergen::Pollen) {
            result.push(Allergen::Pollen);
        }
        if self.is_allergic_to(&Allergen::Cats) {
            result.push(Allergen::Cats);
        }
        
        result
    }
}