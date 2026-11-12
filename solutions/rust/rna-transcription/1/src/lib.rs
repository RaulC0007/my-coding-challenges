#[derive(Debug, PartialEq, Eq)]
pub struct Dna {
    strand: String,
}

#[derive(Debug, PartialEq, Eq)]
pub struct Rna {
    strand: String,
}

impl Dna {
    pub fn new(dna: &str) -> Result<Dna, usize> {
        for (index, c) in dna.char_indices() {
            match c {
                'G' | 'C' | 'T' | 'A' => {}
                _ => return Err(index),
            }
        }
        Ok(Dna {
            strand: dna.to_string(),
        })
    }

    pub fn into_rna(self) -> Rna {
        let rna_strand: String = self
            .strand
            .chars()
            .map(|c| match c {
                'G' => 'C',
                'C' => 'G',
                'T' => 'A',
                'A' => 'U',
                _ => unreachable!(),
            })
            .collect();

        Rna { strand: rna_strand }
    }
}

impl Rna {
    pub fn new(rna: &str) -> Result<Rna, usize> {
        for (index, c) in rna.char_indices() {
            match c {
                'G' | 'C' | 'U' | 'A' => {}
                _ => return Err(index),
            }
        }
        Ok(Rna {
            strand: rna.to_string(),
        })
    }
}
